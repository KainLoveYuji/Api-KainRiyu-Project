const path = require('path');
const { readFileSync } = require('fs-extra');

exports.name = '/vdgaiv2';
exports.index = async (req, res, next) => {
    try {
        const KainRiyu = require('./json/vdgaiv2.json');
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
