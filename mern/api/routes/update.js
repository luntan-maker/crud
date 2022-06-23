var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb')
require('dotenv').config()


router.put('/', async function(req, res, next) {
    const uri = process.env.DB_URI
    const client = new MongoClient(uri);
    try {    
        await client.connect();
        await updateListing(client, req.query.title, {testing: req.query.replace})
        res.send("okay")
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    
});

module.exports = router;

async function updateListing(client, nameOfListing, updatedListing) {
    const result = await client.db("todo").collection("todo").updateOne({testing: nameOfListing}, {$set: updatedListing})
    
}