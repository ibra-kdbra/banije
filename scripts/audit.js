
import fs from 'fs';
import path from 'path';

function getSlugs(dir) {
    const files = [];
    function walk(currentDir) {
        for (const item of fs.readdirSync(currentDir)) {
            const fullPath = path.join(currentDir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (item.endsWith('.md')) {
                files.push(fullPath);
            }
        }
    }
    walk(dir);
    return files.map(f => {
        let slug = path.relative(dir, f).replace(/\.md$/, '');
        // Astro default slug for index.md files
        if (slug.endsWith('/index')) {
            slug = slug.substring(0, slug.length - 6);
        }
        return slug;
    });
}

const originalPosts = getSlugs('src/content/posts');
console.log(`Found ${originalPosts.length} original posts.`);

const languages = ['tr', 'ja', 'ko', 'es', 'zh_CN', 'zh_TW'];

for (const lang of languages) {
    const transDir = `src/content/translate/${lang}`;
    if (!fs.existsSync(transDir)) {
        console.log(`[${lang}] Directory missing`);
        continue;
    }
    const transFiles = fs.readdirSync(transDir).filter(f => f.endsWith('.md'));
    console.log(`[${lang}] Found ${transFiles.length} translations.`);
    
    // Check for missing matches
    const transData = transFiles.map(f => {
        const content = fs.readFileSync(path.join(transDir, f), 'utf-8');
        const match = content.match(/originalSlug:\s*["']?([^"'\n]+)["']?/);
        return { file: f, originalSlug: match ? match[1] : null };
    });

    originalPosts.forEach(slug => {
        const altSlug = slug.replace(/\//g, '_');
        const hasMatch = transData.some(t => t.originalSlug === slug || t.originalSlug === altSlug || t.originalSlug === slug + '_index');
        if (!hasMatch) {
            console.log(`[${lang}] Missing translation for: ${slug}`);
        }
    });
}
