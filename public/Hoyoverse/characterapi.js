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
        const data = fs.readFileSync(filePath, 'utf-8');
        const character = JSON.parse(data);

        characterNames.push(character.character.name);
        charactersData[character.character.name] = character.character;
    }

    const game = req.params.game;
    const characterName = req.params.name;

    if (!characterName || !game) {
        return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    const checker = stringSimilarity.findBestMatch(characterName, characterNames);
    const bestMatchName = checker.bestMatch.target;

    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};
