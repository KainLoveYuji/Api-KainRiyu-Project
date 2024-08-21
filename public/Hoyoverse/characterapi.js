const stringSimilarity = require('string-similarity');
const fs = require('fs-extra');
const path = require('path');

exports.name = '/Hoyoverse';
exports.index = async (req, res, next) => {
    // Đường dẫn tới thư mục chứa thông tin nhân vật
    const charactersDir = path.join(__dirname, '/characters');
    
    // Đọc danh sách các file JSON trong thư mục
    const characterFiles = fs.readdirSync(charactersDir);

    // Tạo danh sách tên nhân vật từ các file JSON
    let characterNames = [];
    let charactersData = {};

    // Đọc dữ liệu từ các file JSON
    for (const file of characterFiles) {
        const filePath = path.join(charactersDir, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        const characters = JSON.parse(data);

        characters.forEach(character => {
            characterNames.push(character.name);
            charactersData[character.name] = character;
        });
    }

    const url = req.query.key;
    if (!url) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

    const checker = stringSimilarity.findBestMatch(url, characterNames);
    const bestMatchName = checker.bestMatch.target;

    // Tìm thông tin nhân vật từ dữ liệu đã đọc
    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};

