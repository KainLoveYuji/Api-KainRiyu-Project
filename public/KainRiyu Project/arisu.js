exports.name = '/arisu';
exports.index = async(req, res, next) => {
    try {
        const KainRiyu = require('./data/json/arisu.json');
        var KainProject = KainRiyu[Math.floor(Math.random() * KainRiyu.length)].trim();
        res.jsonp({
            url: KainProject,
            data: KainProject,
            count: KainRiyu.length,
            author: 'Kain Naji'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
