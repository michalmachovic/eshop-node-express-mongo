const url = 'mongodb+srv://macho:be4icP8NWv5d3I1G@cluster0-gconm.mongodb.net/test?retryWrites=true&w=majority';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    url
  )
    .then(client => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No db found';
}

exports.mongoConnect = mongoConnect;
exports.db = getDb;
