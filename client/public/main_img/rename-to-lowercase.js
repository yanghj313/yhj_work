const fs = require('fs');
const path = require('path');

const dir = '.'; // 현재 폴더 기준 (이미지 폴더에서 실행)

// 변경할 확장자 목록 (대문자 → 소문자)
const targetExtensions = ['.JPG', '.JPEG', '.PNG'];

fs.readdirSync(dir).forEach(file => {
  const ext = path.extname(file);
  const base = path.basename(file, ext);

  if (targetExtensions.includes(ext)) {
    const newExt = ext.toLowerCase();
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, base + newExt);

    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} → ${base + newExt}`);
  }
});
