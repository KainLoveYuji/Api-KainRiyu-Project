exports.name = '/misuha';
exports.index = async(req, res, next) => {
    const fs = require('fs-extra');
    try {
        let dirPath = __dirname + `/data/txt/misuha.txt`;
        var KainRiyu = (fs.readFileSync(dirPath, "utf-8").split(/\r?\n/));
        var KainProject = KainRiyu[Math.floor(Math.random() * KainRiyu.length)].trim();
        res.jsonp({
            url: KainProject,
            data: KainProject,
            count: KainRiyu.length,
            author: "Kain Naji"
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}
