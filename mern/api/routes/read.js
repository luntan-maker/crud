var express = require('express');
var router = express.Router();
const {MongoClient} = require('mongodb')
require('dotenv').config()


router.get('/', async function(req, res, next) {
    const uri = process.env.DB_URI
    const client = new MongoClient(uri);
    try {    
        await client.connect();
        await getAllListings(client)
        
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
    
});

module.exports = router;

async function getAllListings(client) {
    var cursor = await client.db("todo").collection("todo").find();
    cursor.each(function(err, item ){
        if(item==null){
            db.close();
            return;
        }
        console.log(item);
    })
    
}