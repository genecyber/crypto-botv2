var Feed = require('rss-to-json')
var express = require('express')


Feed.load('http://cointelegraph.com/rss', function(err, rss){
    console.log(JSON.stringify(rss, null, 4))
})