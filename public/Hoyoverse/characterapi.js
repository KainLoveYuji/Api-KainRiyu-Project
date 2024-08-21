const path = require('path');
const fs = require('fs');

exports.name = '/Hoyoverse/GenshinImpact/:name';
exports.index = async (req, res, next) => {
    const charactersDir = path.join(__dirname, 'characters'); // Đường dẫn tới thư mục chứa tệp JSON về nhân vật
    const name = req.params.name;
    
    if (!name) return res.json({ error: 'Thiếu "name" nhân vật cần tìm' });

    // Đọc danh sách nhân vật từ tệp GenshinImpact.json
    const genshinImpactPath = path.join(__dirname, 'GenshinImpact.json');
    if (!fs.existsSync(genshinImpactPath)) return res.json({ error: 'Tệp dữ liệu không tồn tại!' });
    const genshinImpactData = JSON.parse(fs.readFileSync(genshinImpactPath, 'utf8'));
    
    // Tìm tệp JSON của nhân vật trong thư mục characters
    const characterFilePath = path.join(charactersDir, `${name}.json`);
    if (!fs.existsSync(characterFilePath)) return res.json({ error: 'Tệp dữ liệu nhân vật không tồn tại!' });

    const characterData = JSON.parse(fs.readFileSync(characterFilePath, 'utf8'));
    return res.json(characterData);
}
