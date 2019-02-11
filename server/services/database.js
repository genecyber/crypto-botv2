var fs = require('fs-extra')
var path = require('path')

var DB_FILE = path.resolve(__dirname, '..', 'db.json')
var db = {items: []}
checkFile()
function checkFile(){
    if(fs.existsSync(DB_FILE)) {
        this.db = require(DB_FILE)
        this.db.save = function(cb){
            fs.writeFileSync(DB_FILE, JSON.stringify({items: db.items}, null, 4))
            console.log("Database Saved")
            return cb()
        }
        this.db.sync = function(feed, cb){
            this.uniqueTitles = feed.items.map((feedItem)=>{return feedItem.title}).filter(title=>{return !db.items.map(dbItem=>{return dbItem.title}).includes(title)})
            this.uniqueItems = feed.items.filter(item=>{return this.uniqueTitles.includes(item.title)})
            if (this.uniqueItems.length > 0) {
                db.items = db.items.concat(this.uniqueItems)
                db.save(cb)
            } else {
                return cb()
            }
        }
        this.db.unCleaned = function(){
            return db.items.filter(item=>{return !item.cleaned})
        }
        this.db.saveCleaned =  function(cleaned){
            var uncleaned = db.unCleaned() 
            console.log(uncleaned)
        }
        db = this.db
    } else {
        fs.ensureFileSync(DB_FILE)
        fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 4))
        checkFile()
    }
}


module.exports = db

