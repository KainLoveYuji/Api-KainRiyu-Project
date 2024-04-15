const path = require('path');
const { readFileSync } = require('fs-extra');

exports.name = '/animevip3';
exports.index = async (req, res, next) => {
    try {
        const filePath = path.join(__dirname, 'Kz-API', 'KainRiyuProject_Images', 'animevip3.txt');
        const KainRiyu = readFileSync(filePath, 'utf-8')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line); // Remove empty lines

        var image = KainRiyu[Math.floor(Math.random() * KainRiyu.length)];

        res.jsonp({
            url: image,
            data: image,
            count: KainRiyu.length,
            author: 'Kain Naji'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
};
