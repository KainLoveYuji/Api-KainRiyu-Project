exports.name = '/vdanimev2';
exports.index = async(req, res, next) => {
    try {
        const KainRiyu = require('./data/vdanimev2.txt');
        var image = KainRiyu[Math.floor(Math.random() * KainRiyu.length)].trim();
        res.jsonp({
            url: image,
            data: image,
            count: KainRiyu.length,
            author: 'Kain Naji'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}

