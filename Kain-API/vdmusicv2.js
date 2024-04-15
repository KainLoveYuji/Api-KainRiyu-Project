const path = require('path');
const { readFileSync } = require('fs-extra');

exports.name = '/vdmusicv2';
exports.index = async (req, res, next) => {
    try {
        const KainRiyu = require('./Kz-API/json/vdmusicv2.json');
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
