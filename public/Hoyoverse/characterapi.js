const fs = require('fs-extra');
const path = require('path');
const stringSimilarity = require('string-similarity');

exports.name = '/Hoyoverse/:game/:name';
exports.index = async (req, res, next) => {
    try {
        // Thư mục chứa các file JSON nhân vật
        const charactersDir = path.join(__dirname, 'characters');
        const characterFiles = fs.readdirSync(charactersDir);

        let characterNames = [];
        let charactersData = {};

        // Đọc tất cả các file JSON và lưu dữ liệu nhân vật
        for (const file of characterFiles) {
            const filePath = path.join(charactersDir, file);
            const data = fs.readFileSync(filePath, 'utf-8');
            const character = JSON.parse(data);

            if (character.character && character.character.name) {
                characterNames.push(character.character.name);
                charactersData[character.character.name] = character.character;
            }
        }

        const game = req.params.game;
        const characterName = req.params.name;

        // Kiểm tra nếu thiếu thông tin
        if (!characterName || !game) {
            return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
        }

        // Tìm kiếm tên nhân vật tương tự nhất
        const checker = stringSimilarity.findBestMatch(characterName, characterNames);
        const bestMatchName = checker.bestMatch.target;

        // Lấy thông tin nhân vật từ dữ liệu
        const character = charactersData[bestMatchName];
        if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

        res.json({ character });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi xử lý yêu cầu:', error);
        res.status(500).jsonp({ error: 'Đã xảy ra lỗi khi xử lý yêu cầu' });
    }
};
