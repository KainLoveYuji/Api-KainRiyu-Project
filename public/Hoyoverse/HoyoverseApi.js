const path = require('path');
const fs = require('fs');

exports.name = '/Hoyoverse/:game/:name';
exports.index = async (req, res, next) => {
    const game = req.params.game;
    const name = req.params.name;

    if (!game || !name) {
        return res.json({ error: 'Thiếu tham số "game" hoặc "name"' });
    }

    // Xác định đường dẫn đến thư mục chứa các tệp JSON của nhân vật theo trò chơi
    const charactersDir = path.join(__dirname, game);
    const characterFilePath = path.join(charactersDir, `${name}.json`);

    if (!fs.existsSync(characterFilePath)) {
        return res.json({ error: 'Không tìm thấy dữ liệu nhân vật này!' });
    }

    try {
        const characterData = JSON.parse(fs.readFileSync(characterFilePath, 'utf8'));
        return res.json(characterData);
    } catch (error) {
        return res.json({ error: 'Lỗi khi đọc dữ liệu nhân vật!' });
    }
}
