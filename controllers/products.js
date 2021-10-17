const { request, response } = require("express");
const { Product, Category } = require('../models');


// get products
const getProducts = async ( req = request, res = response ) => {

  const { from = 0, limit = 10 } = req.params;
  const query = { state: true }

  const [ total, products ] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
           .populate('user', 'name')
           .populate('category', 'name')
           .skip( Number(from) )
           .limit( Number(limit) )
  ]);

  res.status(200).json({
    total,
    products
  });

};

// get product

const getProduct = async ( req = request, res = response ) => {
  const { id } = req.params;

  const product = await Product
                        .findById( id )
                        .populate('user', 'name')
                        .populate('category', 'name')

  res.status(200).json({
    product
  });
};

// create product
const createProduct = async ( req = request, res = response ) => {

  const { state, user, name, category, ...remaining } = req.body;

  const dbProduct = await Product.findOne({ name: name.toUpperCase(), category });

  if ( dbProduct ) {
    return res.status(400).json({
      msg: `The product ${ name } already exists`
    });
  }

  const data = {
    name: name.toUpperCase(),
    user: req.authUser._id,
    category,
    ...remaining
  }

  const product = new Product( data );

  // Save in DB
  await product.save();

  res.status(201).json(product);

};

const updateProduct = async ( req = request, res = response ) => {

  const { id } = req.params;

  const { state, user, ...data } = req.body;
  if (data.name) data.name = data.name.toUpperCase();
  data.user = req.authUser._id;

  if ( data.category ) {

    const existsProduct = await Product.find({ name: data.name, category: data.category });
      if ( existsProduct[0] ) {
        return res.status(400).json({
          msg: `The product name: ${ data.name } with ${ data.category } already exists`
        });
      };

  } else {

    if ( data.name ) {
      const product = await Product.findById( id );

      const existsProduct = await Product.find({ name: data.name, category: product.category });
        if ( existsProduct[0] ) {
          return res.status(400).json({
            msg: `The product name: ${ data.name } with ${ data.category } already exists`
          });
        };
    }

  };

  const updatedProduct = await Product.findByIdAndUpdate( id, data, { new: true });

  res.status(200).json({
    updatedProduct
  });

};

// deleteProduct - state: false
const deleteProduct = async ( req = request, res = response ) => {

  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndUpdate( id, { state: false }, { new: true });
  
  res.status(200).json({
    deletedProduct
  });

};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}