const fs = require('fs-extra');
const path = require('path');
const stringSimilarity = require('string-similarity');

exports.name = '/Hoyoverse/:game/:name';
exports.index = async (req, res, next) => {
    const charactersDir = path.join(__dirname, '/characters');
    const characterFiles = fs.readdirSync(charactersDir);

    let characterNames = [];
    let charactersData = {};

    for (const file of characterFiles) {
        const filePath = path.join(charactersDir, file);

        try {
            const data = fs.readFileSync(filePath, 'utf-8');
            const character = JSON.parse(data);

            // Kiểm tra nếu dữ liệu JSON không chứa trường "name"
            if (character && character.name) {
                characterNames.push(character.name);
                charactersData[character.name] = character;
            }
        } catch (error) {
            // Ghi log lỗi nếu có vấn đề khi phân tích JSON
            console.error(`Lỗi khi đọc hoặc phân tích tệp ${file}: ${error.message}`);
        }
    }

    const game = req.params.game;
    const characterName = req.params.name;

    if (!characterName || !game) {
        return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    // Kiểm tra đầu vào trước khi sử dụng
    if (typeof characterName !== 'string' || !Array.isArray(characterNames)) {
        return res.jsonp({ error: 'Dữ liệu đầu vào không hợp lệ' });
    }

    // Tìm kiếm và so sánh tên
    const checker = stringSimilarity.findBestMatch(characterName, characterNames);
    const bestMatchName = checker.bestMatch.target;

    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};
