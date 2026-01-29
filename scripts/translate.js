#!/usr/bin/env node
/**
 * Translate blog posts using free Google Translate API
 * Usage: node scripts/translate.js [--post=slug] [--lang=ja] [--skip-existing]
 */

import { translate } from 'google-translate-api-x';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Configuration
const POSTS_DIR = 'src/content/posts';
const TRANSLATE_DIR = 'src/content/translate';
const TARGET_LANGUAGES = {
  tr: 'Turkish',
  ja: 'Japanese', 
  ko: 'Korean',
  es: 'Spanish',
  zh_CN: 'zh-CN',
  zh_TW: 'zh-TW',
};

// Rate limiting: delay between translations to avoid being blocked
const DELAY_MS = 1500;

/**
 * Sleep for specified milliseconds
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all post files recursively
 */
async function getPostFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Look for index.md in subdirectories
      const indexPath = path.join(fullPath, 'index.md');
      if (existsSync(indexPath)) {
        files.push({
          path: indexPath,
          slug: entry.name + '_index'
        });
      }
    } else if (entry.name.endsWith('.md')) {
      files.push({
        path: fullPath,
        slug: entry.name.replace('.md', '')
      });
    }
  }
  
  return files;
}

/**
 * Parse frontmatter and content from markdown
 */
function parseMarkdown(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: '', body: content };
  }
  return {
    frontmatter: match[1],
    body: match[2]
  };
}

/**
 * Extract translatable values from frontmatter
 */
function extractFrontmatterTranslatable(frontmatter) {
  const lines = frontmatter.split('\n');
  const translatable = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Extract title
    const titleMatch = line.match(/^title:\s*["']?(.+?)["']?\s*$/);
    if (titleMatch) {
      translatable.title = { index: i, value: titleMatch[1] };
    }
    
    // Extract description
    const descMatch = line.match(/^description:\s*["']?(.+?)["']?\s*$/);
    if (descMatch) {
      translatable.description = { index: i, value: descMatch[1] };
    }
  }
  
  return { lines, translatable };
}

/**
 * Ensure a frontmatter field exists or update it
 */
function setFrontmatterField(lines, key, value) {
  const fieldRegex = new RegExp(`^${key}:`);
  const existingIndex = lines.findIndex((line) => fieldRegex.test(line.trim()));
  const newLine = `${key}: ${value}`;

  if (existingIndex !== -1) {
    lines[existingIndex] = newLine;
    return;
  }

  const seriesIndex = lines.findIndex((line) => line.trim().startsWith('series:'));
  if (seriesIndex !== -1) {
    lines.splice(seriesIndex, 0, newLine);
    return;
  }

  lines.push(newLine);
}

/**
 * Split content into translatable segments, preserving code blocks and special syntax
 */
function splitIntoSegments(body) {
  const segments = [];
  // Match code blocks, inline code, URLs, image refs, and special markdown directives
  const preserveRegex = /```[\s\S]*?```|`[^`\n]+`|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)|https?:\/\/\S+|:::[\s\S]*?:::/g;
  
  let lastIndex = 0;
  let match;
  
  while ((match = preserveRegex.exec(body)) !== null) {
    // Text before preserved content
    if (match.index > lastIndex) {
      const text = body.slice(lastIndex, match.index);
      if (text.trim()) {
        segments.push({ type: 'text', content: text });
      } else if (text) {
        segments.push({ type: 'preserve', content: text });
      }
    }
    
    // Preserved content (don't translate)
    segments.push({ type: 'preserve', content: match[0] });
    lastIndex = match.index + match[0].length;
  }
  
  // Remaining text after last preserved content
  if (lastIndex < body.length) {
    const text = body.slice(lastIndex);
    if (text.trim()) {
      segments.push({ type: 'text', content: text });
    } else if (text) {
      segments.push({ type: 'preserve', content: text });
    }
  }
  
  return segments;
}

/**
 * Normalize code fences that were merged with text or headings
 */
function normalizeCodeFences(content) {
  const lines = content.split('\n');
  const normalized = [];

  for (const line of lines) {
    if (line.includes('```') && !line.trim().startsWith('```')) {
      const parts = line.split('```');
      const before = parts.shift();
      const after = parts.join('```');

      if (before !== undefined) {
        normalized.push(before);
      }

      if (after !== undefined) {
        normalized.push(`\`\`\`${after}`);
      }
      continue;
    }

    if (/^```#+\s*/.test(line) || /^```-+\s*/.test(line)) {
      const remainder = line.replace(/^```/, '').trim();
      normalized.push('```');
      if (remainder) {
        normalized.push(remainder);
      }
      continue;
    }

    normalized.push(line);
  }

  return normalized.join('\n');
}

/**
 * Translate text using Google Translate with retry logic
 */
async function translateText(text, targetLang, retries = 3) {
  if (!text || !text.trim()) return text;
  
  // Map our language codes to Google's
  const langCode = targetLang === 'zh_CN' ? 'zh-CN' : 
                   targetLang === 'zh_TW' ? 'zh-TW' : 
                   targetLang;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await translate(text, { to: langCode });
      return result.text;
    } catch (error) {
      console.error(`  Translation attempt ${attempt + 1} failed:`, error.message);
      if (attempt < retries - 1) {
        await sleep(DELAY_MS * (attempt + 1));
      }
    }
  }
  
  // Return original text if all retries fail
  console.warn(`  ⚠️ Failed to translate, keeping original text`);
  return text;
}

/**
 * Translate segments
 */
async function translateSegments(segments, targetLang) {
  const translated = [];
  let textSegmentCount = segments.filter(s => s.type === 'text').length;
  let currentTextSegment = 0;
  
  for (const segment of segments) {
    if (segment.type === 'preserve') {
      // Don't translate preserved content
      translated.push(segment.content);
    } else {
      // Translate text segments
      currentTextSegment++;
      process.stdout.write(`  Translating segment ${currentTextSegment}/${textSegmentCount}...\r`);
      const translatedText = await translateText(segment.content, targetLang);
      translated.push(translatedText);
      await sleep(DELAY_MS);
    }
  }
  
  if (textSegmentCount > 0) {
    console.log(`  Translated ${textSegmentCount} segments                    `);
  }
  
  return translated.join('');
}

/**
 * Translate a single post to a target language
 */
async function translatePost(postFile, targetLang) {
  const content = await readFile(postFile.path, 'utf-8');
  const { frontmatter, body } = parseMarkdown(content);
  const { lines, translatable } = extractFrontmatterTranslatable(frontmatter);

  // Ensure translate collection metadata
  setFrontmatterField(lines, 'lang', `"${targetLang}"`);
  setFrontmatterField(lines, 'originalSlug', `"${postFile.slug}"`);
  
  // Translate frontmatter title and description
  if (translatable.title) {
    console.log(`  Translating title...`);
    const translated = await translateText(translatable.title.value, targetLang);
    lines[translatable.title.index] = `title: "${translated}"`;
    await sleep(DELAY_MS);
  }
  
  if (translatable.description) {
    console.log(`  Translating description...`);
    const translated = await translateText(translatable.description.value, targetLang);
    lines[translatable.description.index] = `description: "${translated}"`;
    await sleep(DELAY_MS);
  }
  
  // Split body into segments and translate
  const segments = splitIntoSegments(body);
  const translatedBody = normalizeCodeFences(
    await translateSegments(segments, targetLang)
  );
  
  // Reconstruct the markdown
  const translatedFrontmatter = lines.join('\n');
  return `---\n${translatedFrontmatter}\n---\n${translatedBody}`;
}

/**
 * Save translated post
 */
async function saveTranslation(slug, lang, content) {
  const langDir = path.join(TRANSLATE_DIR, lang);
  
  if (!existsSync(langDir)) {
    await mkdir(langDir, { recursive: true });
  }
  
  const filePath = path.join(langDir, `${slug}.md`);
  await writeFile(filePath, content, 'utf-8');
  return filePath;
}

/**
 * Check if translation already exists
 */
function translationExists(slug, lang) {
  const filePath = path.join(TRANSLATE_DIR, lang, `${slug}.md`);
  return existsSync(filePath);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const specificPost = args.find(a => a.startsWith('--post='))?.split('=')[1];
  const specificLang = args.find(a => a.startsWith('--lang='))?.split('=')[1];
  const skipExisting = args.includes('--skip-existing');
  
  console.log('🌐 Blog Post Translator (Free Google Translate API)\n');
  
  // Get all posts
  let posts = await getPostFiles(POSTS_DIR);
  
  if (specificPost) {
    posts = posts.filter(p => p.slug === specificPost || p.slug.includes(specificPost));
  }
  
  if (posts.length === 0) {
    console.log('No posts found to translate.');
    return;
  }
  
  console.log(`📝 Found ${posts.length} post(s) to translate`);
  
  // Determine target languages
  const languages = specificLang 
    ? { [specificLang]: TARGET_LANGUAGES[specificLang] || specificLang }
    : TARGET_LANGUAGES;
  
  console.log(`🎯 Target languages: ${Object.keys(languages).join(', ')}`);
  console.log(`⏱️  Delay between requests: ${DELAY_MS}ms (to avoid rate limiting)\n`);
  
  let totalTranslated = 0;
  let totalSkipped = 0;
  let totalFailed = 0;
  
  for (const post of posts) {
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`📄 Processing: ${post.slug}`);
    console.log(`   Source: ${post.path}`);
    
    for (const [langCode, langName] of Object.entries(languages)) {
      // Skip if translation exists and --skip-existing is set
      if (skipExisting && translationExists(post.slug, langCode)) {
        console.log(`  ⏭️  ${langCode}: Already exists, skipping`);
        totalSkipped++;
        continue;
      }
      
      try {
        console.log(`\n  🔄 Translating to ${langCode} (${langName})...`);
        const startTime = Date.now();
        const translated = await translatePost(post, langCode);
        const savedPath = await saveTranslation(post.slug, langCode, translated);
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`  ✅ Saved: ${savedPath} (${duration}s)`);
        totalTranslated++;
        
        // Add delay between languages to avoid rate limiting
        await sleep(DELAY_MS);
      } catch (error) {
        console.error(`  ❌ Failed to translate to ${langCode}:`, error.message);
        totalFailed++;
      }
    }
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log('📊 Translation Summary:');
  console.log(`   ✅ Translated: ${totalTranslated}`);
  console.log(`   ⏭️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log('═'.repeat(50));
  
  if (totalTranslated > 0) {
    console.log('\n💡 Tip: Run with --skip-existing to skip already translated posts');
  }
}

main().catch(console.error);
