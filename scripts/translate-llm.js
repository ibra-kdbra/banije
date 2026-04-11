#!/usr/bin/env node
/**
 * Translate blog posts using Google Gemini AI API (Free Tier)
 * Fixed: Daily Quota Handlers & Persistent Model Tracking
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const POSTS_DIR = "src/content/posts";
const SPEC_DIR = "src/content/spec";
const TRANSLATE_DIR = "src/content/translate";

const TARGET_LANGUAGES = {
  tr: "Turkish",
  ja: "Japanese",
  ko: "Korean",
  es: "Spanish",
  ar: "Arabic",
  zh_CN: "Simplified Chinese",
  zh_TW: "Traditional Chinese",
};

// Gemini Setup
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is not set in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * FREE MODELS (March 2026 Priority)
 * We put 'Lite' first because it has a 1,500/day limit.
 * 'Flash' (Standard) is often restricted to 20/day on the free tier.
 */
const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3.1-flash-lite-preview",
];

// PERSISTENT TRACKER: This ensures that once a model hits a daily limit,
// the script stays on the fallback model for the rest of the files.
let currentActiveModelIndex = 0;

const BASE_DELAY_MS = 3000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPostFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, "index.md");
      if (existsSync(indexPath))
        files.push({ path: indexPath, slug: entry.name, isIndex: true });
      const subEntries = await readdir(fullPath, { withFileTypes: true });
      for (const subEntry of subEntries) {
        if (
          !subEntry.isDirectory() &&
          subEntry.name.endsWith(".md") &&
          subEntry.name !== "index.md"
        ) {
          files.push({
            path: path.join(fullPath, subEntry.name),
            slug: `${entry.name}/${subEntry.name.replace(".md", "")}`,
            isIndex: false,
          });
        }
      }
    } else if (entry.name.endsWith(".md")) {
      files.push({
        path: fullPath,
        slug: entry.name.replace(".md", ""),
        isIndex: false,
      });
    }
  }
  return files;
}

/**
 * Translate a post using Gemini with Smart Quota Fallback
 */
async function translateWithAI(content, targetLangName, retryCount = 0) {
  // Use the globally tracked active model
  const modelName = MODELS[currentActiveModelIndex];
  const model = genAI.getGenerativeModel({ model: modelName });

  const prompt = `You are an expert technical linguist and senior software engineer.
Translate the provided Markdown content into ${targetLangName}.

### CORE MISSION:
Produce a high-quality technical translation that feels native to a developer speaking ${targetLangName}. While this must work for any language, pay extreme attention to Bi-Directional (BiDi) formatting if the target is Arabic.

### TRANSLATION RULES:
1. **Technical Tone**: Use a professional, modern "Tech-Stack" vocabulary.
2. **Arabic-Specific Handling (If target is Arabic)**:
   - **BiDi Integrity**: Ensure English technical terms or variable names within Arabic sentences are formatted to prevent text-flipping.
   - **Terminology**: Use modern tech Arabic (e.g., use 'واجهة برمجة التطبيقات' for API or keep 'API' if it is the industry standard).
   - **Punctuation**: Use Arabic-specific punctuation where appropriate (e.g., '،' instead of ',').
3. **Markdown Preservation**:
   - **Frontmatter**: Translate ONLY the values for 'title' and 'description'. Keep keys and date formats identical.
   - **Code**: STRICTLY DO NOT translate \`inline code\` or \`\`\`code blocks\`\`\`. Never translate variable names or comments unless explicitly requested.
   - **Non-Translatable**: Keep URLs, file paths, and image alt-text (if it serves as a functional ID) in their original form.
4. **Component Syntax**:
   - Keep \`:::type [Title]\` containers. Only translate the 'Title' inside the brackets.
   - Maintain all HTML tags (\`<br>\`, \`<div>\`, etc.) exactly as they are.

### OUTPUT REQUIREMENTS:
- Return ONLY the raw translated Markdown.
- No conversational filler ("Sure, here is...") or markdown code-block wrapping.
- Ensure the Markdown structure (headers, lists, bolding) remains identical to the source.

---
CONTENT TO TRANSLATE:
${content}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown block wrapping if AI adds it
    text = text.replace(/^```markdown\n/, "").replace(/\n```$/, "");
    text = text.replace(/^```\w*\n/, "").replace(/\n```$/, "");

    return text.trim();
  } catch (error) {
    const errorMsg = error.message || "";

    // 1. Handle DAILY QUOTA (The 'limit: 20' error)
    // If we hit the daily wall, don't wait. Switch models and stay on the new one.
    if (
      errorMsg.includes("quota") &&
      (errorMsg.includes("limit: 20") || errorMsg.includes("PerDay"))
    ) {
      if (currentActiveModelIndex < MODELS.length - 1) {
        console.log(
          `\n    🛑 Daily Quota for ${modelName} exhausted. Switching permanently to ${MODELS[currentActiveModelIndex + 1]}...`,
        );
        currentActiveModelIndex++;
        return translateWithAI(content, targetLangName, 0);
      }
    }

    // 2. Handle RATE LIMITS (429 - Per Minute)
    if (errorMsg.includes("429") || errorMsg.includes("Too Many Requests")) {
      if (retryCount < 1) {
        console.log(
          `\n    ⚠️  Minute limit hit (${modelName}). Waiting 65s...`,
        );
        await sleep(65000);
        return translateWithAI(content, targetLangName, retryCount + 1);
      } else if (currentActiveModelIndex < MODELS.length - 1) {
        console.log(
          `\n    🔄  Rate limit persists. Trying fallback model ${MODELS[currentActiveModelIndex + 1]}...`,
        );
        currentActiveModelIndex++;
        return translateWithAI(content, targetLangName, 0);
      }
    }

    // 3. Handle SERVER BUSY (503/504)
    if (errorMsg.includes("503") || errorMsg.includes("Service Unavailable")) {
      if (currentActiveModelIndex < MODELS.length - 1) {
        console.log(
          `\n    🔄  Server busy. Trying fallback ${MODELS[currentActiveModelIndex + 1]}...`,
        );
        currentActiveModelIndex++;
        return translateWithAI(content, targetLangName, 0);
      }
    }

    throw new Error(`AI Translation failed (${modelName}): ${error.message}`);
  }
}

async function translateSpecFiles(languages, skipExisting) {
  if (!existsSync(SPEC_DIR)) return;
  console.log(
    `\n${"═".repeat(50)}\n📂 Processing System Files (Spec)\n${"═".repeat(50)}`,
  );

  const files = await readdir(SPEC_DIR);
  const baseFiles = files.filter((f) => f.endsWith(".md") && !f.includes("-"));

  for (const file of baseFiles) {
    const baseName = file.replace(".md", "");
    const sourcePath = path.join(SPEC_DIR, file);
    const content = await readFile(sourcePath, "utf-8");

    console.log(`\n📄 File: ${file}`);

    for (const [langCode, langName] of Object.entries(languages)) {
      const targetFile = `${baseName}-${langCode}.md`;
      const targetPath = path.join(SPEC_DIR, targetFile);

      if (skipExisting && existsSync(targetPath)) {
        console.log(`  ⏭️  ${langCode}: Skipping (Exists)`);
        continue;
      }

      try {
        process.stdout.write(`  🔄 Translating to ${langCode}...`);
        const startTime = Date.now();
        const translatedContent = await translateWithAI(content, langName);
        await sleep(BASE_DELAY_MS);

        await writeFile(targetPath, translatedContent, "utf-8");
        console.log(
          `\r  ✅ ${langCode}: Saved to ${targetFile} (${((Date.now() - startTime) / 1000).toFixed(1)}s)`,
        );
      } catch (error) {
        console.log(`\r  ❌ ${langCode}: Failed - ${error.message}`);
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const specificPost = args.find((a) => a.startsWith("--post="))?.split("=")[1];
  const specificLang = args.find((a) => a.startsWith("--lang="))?.split("=")[1];
  const skipExisting = args.includes("--skip-existing");

  console.log("🤖 Blog Post Translator (Stable 2026 Build)\n");

  let posts = await getPostFiles(POSTS_DIR);
  if (specificPost)
    posts = posts.filter(
      (p) => p.slug === specificPost || p.slug.endsWith(specificPost),
    );

  const languages = specificLang
    ? { [specificLang]: TARGET_LANGUAGES[specificLang] || specificLang }
    : TARGET_LANGUAGES;

  console.log(`📝 Found ${posts.length} post(s) to translate`);
  console.log(`🎯 Target languages: ${Object.keys(languages).join(", ")}\n`);

  // Translate Spec files (About, etc) if no specific post is requested
  if (!specificPost) {
    await translateSpecFiles(languages, skipExisting);
  }

  for (const post of posts) {
    console.log(`\n${"─".repeat(50)}\n📄 Processing: ${post.slug}`);
    const content = await readFile(post.path, "utf-8");

    for (const [langCode, langName] of Object.entries(languages)) {
      const langDir = path.join(TRANSLATE_DIR, langCode);
      const fileName = post.slug.replace(/\//g, "_");
      const targetPath = path.join(langDir, `${fileName}.md`);

      if (skipExisting && existsSync(targetPath)) {
        console.log(`  ⏭️  ${langCode}: Skipping (Exists)`);
        continue;
      }

      try {
        process.stdout.write(`  🔄 Translating to ${langCode}...`);
        const startTime = Date.now();

        // Note: We no longer pass modelIndex here so it uses the persistent currentActiveModelIndex
        const translatedContent = await translateWithAI(content, langName);

        await sleep(BASE_DELAY_MS);

        if (!existsSync(langDir)) await mkdir(langDir, { recursive: true });

        let finalContent = translatedContent;
        if (!finalContent.includes(`originalSlug: "${post.slug}"`)) {
          finalContent = finalContent.replace(
            /^---\n/,
            `---\noriginalSlug: "${post.slug}"\nlang: "${langCode}"\n`,
          );
        }

        await writeFile(targetPath, finalContent, "utf-8");
        console.log(
          `\r  ✅ ${langCode}: Saved (${((Date.now() - startTime) / 1000).toFixed(1)}s)`,
        );
      } catch (error) {
        console.log(`\r  ❌ ${langCode}: Failed - ${error.message}`);
        // If we ran out of all models, stop the whole script
        if (
          error.message.includes("exhausted") ||
          currentActiveModelIndex >= MODELS.length
        ) {
          console.error("🛑 All model quotas exhausted. Stopping.");
          process.exit(1);
        }
      }
    }
  }
}

main().catch(console.error);
