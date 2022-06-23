var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb')
require('dotenv').config()


router.post('/', async function(req, res, next) {
    const uri = process.env.DB_URI
    const client = new MongoClient(uri);
    try {    
        await client.connect();
        await createListing(client, {testing: req.query.title})
        
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    
});

module.exports = router;

async function createListing(client, newListing) {
    const result = await client.db("todo").collection("todo").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`)
}