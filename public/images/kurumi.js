exports.name = '/images/kurumi';
exports.index = async(req, res, next) => {
    try {
        const girl = require('./data/json/kurumi.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            data: image,
            count: girl.length,
            author: 'Kain Nạji'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}