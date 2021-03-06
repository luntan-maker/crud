var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb')
require('dotenv').config()


router.get('/', async function(req, res, next) {
    const uri = process.env.DB_URI
    const client = new MongoClient(uri);
    try {    
        await client.connect();
        var docs = await getAllListings(client)
        res.send(docs)
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    
});

module.exports = router;

async function getAllListings(client) {
    
    var arr = []
    const bobo = await client.db("todo").collection("todo").find().forEach(function(doc) {
        arr.push(doc)
    }
    )
    return arr

    
}