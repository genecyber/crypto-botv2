var striptags = require('striptags')

module.exports = {
    cleanHtml: function(rss, cb){
        var cleaned = rss.map(function (item, index, array) { 
            item.cleaned = striptags(item.description)
            return item 
        })
        return cb(null, cleaned)
    }
}