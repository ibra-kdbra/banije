
import fs from 'fs';
import path from 'path';

const dir = 'src/content/translate';
const languages = ['tr', 'ja', 'ko', 'es', 'zh_CN', 'zh_TW'];

function fixContent(content) {
    let result = content;

    // 1. Split merged code blocks on the same line
    // e.g. ```text```bash -> ```text\n\n```bash
    result = result.replace(/(\s*`{3,}[^`\n]*)(`{3,}[^`\n]*)/g, '$1\n\n$2');

    // 2. Fix code block headers merged with text
    // e.g. text```bash -> text\n\n```bash
    result = result.replace(/([^\n])(`{3,})(bash|javascript|json|sh|text|sql|html|css|py|cpp|c|powershell|typescript|yml|yaml|md|markdown)/gi, '$1\n\n$2$3');
    
    // 3. Fix text merged with ending code block
    // e.g. ```text -> \n\n```
    result = result.replace(/([^\n])(`{3,})(\n|$)/g, '$1\n$2$3');

    // 4. Fix attributes in code block headers (Advanced)
    result = result.replace(/^(\s*`{3,})(\S*)(.*)$/gm, (match, ticks, lang, meta) => {
        let newMeta = meta;
        const attrMap = {
            'タイトル=': 'title=',
            'título=': 'title=',
            '标题=': 'title=',
            '제목=': 'title=',
            'titl e=': 'title=',
            'フレーム=': 'frame=',
            'marco=': 'frame=',
            '框架=': 'frame=',
            '프레임=': 'frame=',
            '折りたたみ=': 'collapse=',
            'colapso=': 'collapse=',
            '折叠=': 'collapse=',
            '붕괴=': 'collapse=',
            '허용풀스크린': 'allowfullscreen',
        };

        for (const [bad, good] of Object.entries(attrMap)) {
            newMeta = newMeta.split(bad).join(good);
        }
        
        // Fix spaces in attributes like title = "..."
        newMeta = newMeta.replace(/title\s*=\s*/g, 'title=');
        
        return ticks + lang + newMeta;
    });

    // 5. Fix common language mistranslations in headers
    result = result.replace(/^(\s*`{3,})\s*(javascripton|jsonno|jsonn|javascript\s*on)/gmi, '$1json');
    result = result.replace(/^(\s*`{3,})\s*자바스크립트/gmi, '$1javascript');
    result = result.replace(/^(\s*`{3,})\s*(テキスト|テキスト|文本|텍스트)/gmi, '$1text');
    result = result.replace(/^(\s*`{3,})\s*metin/gmi, '$1text');
    result = result.replace(/^(\s*`{3,})\s*texto/gmi, '$1text');
    result = result.replace(/^(\s*`{3,})\s*쉘/gmi, '$1bash');
    result = result.replace(/^(\s*`{3,})\s*シェル/gmi, '$1bash');
    result = result.replace(/^(\s*`{3,})\s*html타이틀/gmi, '$1html title');
    result = result.replace(/^(\s*`{3,})\s*htmlタイトル/gmi, '$1html title');
    result = result.replace(/^(\s*`{3,})\s*json타이틀/gmi, '$1json title');
    result = result.replace(/^(\s*`{3,})\s*js타이틀/gmi, '$1javascript title');
    
    // 6. Fix specific corruption where lang and title are merged without space
    result = result.replace(/^(\s*`{3,})(html|bash|javascript|json|text|sql|css|py|cpp|c|powershell|typescript|yml|yaml|md|markdown)(title=)/gmi, '$1$2 $3');

    return result;
}

for (const lang of languages) {
    const langDir = path.join(dir, lang);
    if (!fs.existsSync(langDir)) continue;

    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
        const fpath = path.join(langDir, file);
        const content = fs.readFileSync(fpath, 'utf-8');
        const fixed = fixContent(content);
        if (content !== fixed) {
            fs.writeFileSync(fpath, fixed);
            console.log(`Fixed: ${lang}/${file}`);
        }
    }
}
console.log('Cleanup complete.');
