exports.name = '/images/gainhat';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/gainhat.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length,
            author: 'Kain Naji'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
