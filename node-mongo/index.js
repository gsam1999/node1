const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = "mongodb://localhost:27017/" ; 
const dbname = 'conFusion';

MongoClient.connect(url).then((client)=>{

    console.log('Connected correctly to setver');
    const db = client.db(dbname);

    dboper.insertDoc(db,{name:"Vtest",description:"testing"},'dishes')
    .then((result)=>{
        console.log("Insert Doc:\n",result.ops);
        return dboper.findDocs(db,'dishes');
    })
    .then((docs)=>{
        console.log("Found dosc",docs);
        return dboper.updateDoc(db,{name:"Vtest"},{description:"testing updated with test"},'dishes');
    })
    .then((result)=>{
        console.log(' Updated Docs:\n',result.result);
        return dboper.findDocs(db,'dishes');
    })
    .then((docs)=>{
        console.log("Found dosc",docs);
        return db.dropCollection('dishes');
    })
    .then((result)=>{
            console.log("dorpped collesction",result);
    })
    .catch((err)=>{
        console.log(err);
    })

    // const collection = db.collection('dishes');

    // collection.insert({"name":"testp","description":"thid dis in testign"},(err,res)=>{
        
    //     assert.equal(err,null);

    //     console.log(" after insert");
    //     console.log(res.ops);

    //     collection.find({}).toArray((err,docs)=>{
    //         assert.equal(err,null);
    //         console.log("found");
    //         console.log(docs);

    //         db.dropCollection('dishes',(err,result)=>{
    //             assert.equal(err,null);

    //             client.close();
    //         })
    //     })
    // })


});