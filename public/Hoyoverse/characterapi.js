const stringSimilarity = require('string-similarity');
const fs = require('fs-extra');
const path = require('path');

exports.name = '/Hoyoverse';
exports.index = async (req, res, next) => {
    const charactersDir = path.join(__dirname, '/characters');
    
    const characterFiles = fs.readdirSync(charactersDir);

    let characterNames = [];
    let charactersData = {};

    for (const file of characterFiles) {
        const filePath = path.join(charactersDir, file);
        const data = fs.readFileSync(filePath, 'utf-8');
        const characters = JSON.parse(data);

        characters.forEach(character => {
            characterNames.push(character.name);
            charactersData[character.name] = character;
        });
    }

    // Lấy tham số từ phần thân của yêu cầu
    const { name: characterName } = req.body;
    if (!characterName) return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });

    const checker = stringSimilarity.findBestMatch(characterName, characterNames);
    const bestMatchName = checker.bestMatch.target;

    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};
