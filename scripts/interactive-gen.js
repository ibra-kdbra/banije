#!/usr/bin/env node
/**
 * Interactive Image JSON Generator using Google Gemini Vision
 * Scans an image for text labels and outputs percentage-based coordinates.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Configuration
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is not set in .env file");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

/**
 * Convert image file to GenerativePart for Gemini
 */
async function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: (await readFile(path)).toString("base64"),
      mimeType
    },
  };
}

async function generateJSON(imagePath) {
  console.log(`🤖 Scanning image: ${path.basename(imagePath)}...`);

  const prompt = `
    Analyze this technical diagram and identify all text-based labels.
    For each label, find its precise location and dimensions.
    
    RETURN ONLY A JSON ARRAY with this exact structure:
    [
      {
        "id": "kebab-case-id",
        "label": "The Exact Text",
        "info": "A short 1-2 sentence technical description of this element.",
        "x": number (top-left X coordinate in % of image width, 0-100),
        "y": number (top-left Y coordinate in % of image height, 0-100),
        "w": number (width in % of image width, 0-100),
        "h": number (height in % of image height, 0-100)
      }
    ]

    IMPORTANT:
    1. 'x' and 'y' should be the TOP-LEFT corner of the text.
    2. 'w' and 'h' should wrap the text tightly with a tiny bit of padding.
    3. Use the industry-standard terminology for the 'info' descriptions.
    4. DO NOT return any text other than the JSON array.
  `;

  try {
    const imagePart = await fileToGenerativePart(imagePath, "image/webp");
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    let text = response.text();

    // Clean up markdown block wrapping if AI adds it
    text = text.replace(/^```json\n/, "").replace(/\n```$/, "");
    text = text.replace(/^```\n/, "").replace(/\n```$/, "");

    const jsonData = JSON.parse(text);
    const outputPath = imagePath.replace(path.extname(imagePath), ".json");
    
    await writeFile(outputPath, JSON.stringify(jsonData, null, 2), "utf-8");
    
    console.log(`✅ Success! JSON generated: ${outputPath}`);
    console.log(`🔗 Use this file in your ::interactive{data="${outputPath}"} component.`);
  } catch (error) {
    console.error("❌ Generation failed:", error.message);
    process.exit(1);
  }
}

// CLI Handling
const imagePath = process.argv[2];
if (!imagePath) {
  console.log("Usage: node scripts/interactive-gen.js <path-to-image>");
  process.exit(1);
}

generateJSON(imagePath).catch(console.error);
