exports.name = '/poem/love2';
exports.index = async(req, res, next) => {
    try {
        const KainRiyu = require('./data/txt/love2.txt');
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
