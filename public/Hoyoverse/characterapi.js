const stringSimilarity = require('string-similarity');
const fs = require('fs-extra');
const path = require('path');

exports.name = '/Hoyoverse/:game/:name';
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

    // Lấy tham số từ URL path
    const game = req.params.game;
    const characterName = req.params.name;
    
    if (!characterName || !game) {
        return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    // Xử lý dữ liệu theo game nếu cần
    // Ví dụ: lọc nhân vật theo trò chơi cụ thể

    const checker = stringSimilarity.findBestMatch(characterName, characterNames);
    const bestMatchName = checker.bestMatch.target;

    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};
