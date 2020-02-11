const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('product-add', {
        pageTitle: 'Add product',
        path: '/'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.description, 
        req.body.price, 
        null,
        req.user._id);
    product.save();
    res.redirect('/');
}

exports.getProducts =  (req, res, next) => {
    Product.fetchAll().
        then(products => {
            res.render('shop', {
                products: products,
                pageTitle: 'shop',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true
            });
        });
}

exports.getProduct = (req, res, next) => {
    Product.fetchById(req.params.productId).
        then(product => {
            res.render('product', {
                product: product,
                pageTitle: 'product'
            });
        });
}

exports.getEditProduct = (req, res, next) => {
    Product.fetchById(req.params.productId).
        then(product => {
            res.render('product-edit', {
                product: product,
                pageTitle: 'product'
            });
        });
}

exports.postUpdateProduct = (req, res, next) => {
    Product.updateById(req.params.productId, req.body);
    res.redirect('/');
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.fetchById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart',{
                path: '/cart',
                pageTitle: 'Your cart',
                products: products
            })
        });
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(error => {
            console.log(error);
        })
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(error => {
            console.log(error);
        })
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(error => console.log(error));
}