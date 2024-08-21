const stringSimilarity = require('string-similarity');

function areArgsValid(mainString, targetStrings) {
    return typeof mainString === 'string' && Array.isArray(targetStrings) && targetStrings.every(item => typeof item === 'string');
}

exports.name = '/Hoyoverse/:game/:name';
exports.index = async (req, res, next) => {
    // Giả sử bạn đã lấy dữ liệu từ nguồn nào đó
    const characterNames = ["Yae Miko", "Raiden Shogun"];
    const characterName = req.params.name;

    if (!characterName || typeof req.params.game !== 'string') {
        return res.jsonp({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
    }

    if (!areArgsValid(characterName, characterNames)) {
        return res.jsonp({ error: 'Lỗi đối số: Đối số đầu tiên phải là một chuỗi, đối số thứ hai phải là một mảng các chuỗi' });
    }

    const checker = stringSimilarity.findBestMatch(characterName, characterNames);
    const bestMatchName = checker.bestMatch.target;

    // Tiếp tục xử lý dữ liệu và phản hồi
    const charactersData = { "Yae Miko": {}, "Raiden Shogun": {} }; // Dữ liệu giả
    const character = charactersData[bestMatchName];
    if (!character) return res.jsonp({ error: 'Nhân vật không tìm thấy' });

    res.json({ character });
};
