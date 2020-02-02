//const products = []; //old approach saving products to array
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    })
}

module.exports = class Product {
    constructor(body) {
        this.title = body.title;
        this.description = body.description;
        this.price = body.price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    //static means that it will be not called on concrete instance of product model, but will return all products
    //cb = callback function
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}