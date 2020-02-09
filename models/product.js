const fs = require('fs');
const path = require('path');
const mongodb = require('mongodb');
const getDb = require('../util/db').db;

class Product {
    constructor(title, description, price, id, userId) {
        this.title = title;
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        db.collection('products')
        .insertOne(this)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }

    //static means that it will be not called on concrete instance of product model, but will return all products
    static fetchAll() {
        const db = getDb();
        return db
        .collection('products')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });
    }

    static fetchById(prodId) {
        const db = getDb();
        return db
        .collection('products')
        .find({ _id: new mongodb.ObjectId(prodId) })
        .next()
        .then(product => {
            return product;
        })
        .catch(err => {
            console.log(err);
        })
    }

    static updateById(prodId, values) {
        const db = getDb();
        db
        .collection('products')
        .updateOne(
            { _id: new mongodb.ObjectId(prodId) }, 
            { $set: values }
        );
    }
}

module.exports = Product;