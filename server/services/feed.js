var Feed = require('rss-to-json')
module.exports = function(database, cb){
    this.database = database
    this.ready = false
    parent = this
    Feed.load('http://cointelegraph.com/rss', function(err, rss){
        parent.database.sync(rss, ()=>{
            parent.ready = true
            return cb(parent)
        })
    })
    
}