import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const changelogPath = path.join(process.cwd(), 'changelog.md');

function getChanges() {
    const status = execSync('git status --short').toString();
    const changes = status.split('\n').filter(line => line.trim() !== '').map(line => {
        const type = line.substring(0, 2).trim();
        const file = line.substring(3).trim();
        return { type, file };
    });
    return changes;
}

function generateCommitMessage(file) {
    if (file.includes('i18n') || file.includes('translation')) return `i18n: update translation handling for ${path.basename(file)}`;
    if (file.includes('utils/url')) return 'refactor: enhance URL utilities for language-aware routing';
    if (file.includes('utils/content')) return 'feat: implement language-aware content fetching and merging';
    if (file.includes('components/LanguageSwitch')) return 'feat: implement smart language switching with URL redirection';
    if (file.includes('pages/[lang]')) return `feat: implement localized route for ${path.basename(file)}`;
    if (file.includes('pages/')) return `feat: update ${path.basename(file)} to support multilingual content`;
    if (file.includes('components/')) return `feat: update ${path.basename(file)} component for i18n support`;
    if (file.includes('config')) return 'config: update site configuration for multi-language support';
    if (file.includes('constants')) return 'config: update constants for supported languages';
    if (file.includes('styles')) return 'style: update styles for better localized content display';
    if (file.includes('scripts/')) return `chore: add/update utility script ${path.basename(file)}`;
    return `docs: update ${file}`;
}

async function run() {
    const changes = getChanges();
    if (changes.length === 0) {
        console.log('No changes detected.');
        return;
    }

    const date = new Date().toISOString().split('T')[0];
    let changelogEntry = `\n## [${date}] - Multilingual Integration\n\n### Changed\n`;

    for (const change of changes) {
        const message = generateCommitMessage(change.file);
        changelogEntry += `- ${message} (${change.file})\n`;
        
        console.log(`Committing: ${change.file} - ${message}`);
        try {
            execSync(`git add "${change.file}"`);
            execSync(`git commit -m "${message}"`);
        } catch (e) {
            console.error(`Failed to commit ${change.file}: ${e.message}`);
        }
    }

    fs.appendFileSync(changelogPath, changelogEntry);
    console.log('Changelog updated and changes committed.');
    
    // Final commit for changelog itself
    execSync(`git add changelog.md`);
    execSync(`git commit -m "docs: update changelog for multilingual integration"`);
}

run();
