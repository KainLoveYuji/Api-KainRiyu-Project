const path = require('path');
const fs = require('fs');

exports.name = '/Hoyoverse/:game/:name';
exports.index = async (req, res, next) => {
    const game = req.params.game;
    const name = req.params.name;

    if (!game || !name) {
        return res.json({ error: 'Thiếu tham số "game" hoặc "name"' });
    }

    // Xác định đường dẫn tới thư mục chứa dữ liệu nhân vật
    const charactersDir = path.join(__dirname, game);
    const characterFilePath = path.join(charactersDir, `${name}.json`);

    // Kiểm tra sự tồn tại của tệp JSON
    if (!fs.existsSync(characterFilePath)) {
        return res.json({ error: 'Không tìm thấy dữ liệu nhân vật này!' });
    }

    try {
        // Đọc và phân tích dữ liệu từ tệp JSON
        const characterData = JSON.parse(fs.readFileSync(characterFilePath, 'utf8'));
        return res.json(characterData);
    } catch (error) {
        return res.json({ error: 'Lỗi khi đọc dữ liệu nhân vật!' });
    }
}
