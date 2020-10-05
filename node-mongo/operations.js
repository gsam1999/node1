const assert = require('assert');

exports.insertDoc = (db,doc,col,callback)=>{
    const coll = db.collection(col);
    return coll.insertOne(doc);
}

exports.findDocs = (db,col,callback)=>{
    const coll = db.collection(col);
    return coll.find().toArray();
}

exports.removeDoc = (db,doc,col,callback)=>{
    const coll = db.collection(col);
    return coll.deleteOne(doc);
}

exports.updateDoc = (db,doc,update,col,callback)=>{
    const coll = db.collection(col);
    return coll.updateOne(doc,{$set:update},null);
}