var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb')
require('dotenv').config()


router.delete('/', async function(req, res, next) {
    // https://example.com/path/to/page?name=ferret&color=purple
    const uri = process.env.DB_URI
    const client = new MongoClient(uri);
    try {    
        await client.connect();
        await deleteListingByName(client, req.query.title)
        
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    res.send('This is a test');
});

module.exports = router;

async function deleteListingByName(client, nameOfListing){
    const result = await client.db("todo").collection("todo").deleteOne({testing: nameOfListing});
    console.log(`${result.deletedCount} document(s) was/were deleted`)
}