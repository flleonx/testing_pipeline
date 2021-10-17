const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User, Category, Product } = require('../models');

const allowedCollections = [
  'users',
  'categories',
  'products',
  'roles'
];

const searchUsers = async ( term = '', res = response ) => {

  const isMongoId = ObjectId.isValid( term ); // TRUE

  if ( isMongoId ) {
    const user = await User.findById( term );
    return res.json({
      results: ( user ) ? [ user ] : []
    });
  }

  // Regular expression
  const regex = new RegExp( term, 'i' );

  const users = await User.find({
    $or: [{  name: regex }, { email: regex }],
    $and: [{ state: true }]
  });

  res.json({
    results: users
  });

};

const searchCategories = async ( term = '', res = response ) => {

  const isMongoId = ObjectId.isValid( term ); // TRUE

  if ( isMongoId ) {
    const category = await Category.findById( term );
    return res.json({
      results: ( category ) ? [ category ] : []
    });
  }

  // Regular expression
  const regex = new RegExp( term, 'i' );

  const categories = await Category.find({ name: regex, state: true });

  res.json({
    results: categories
  });

};

const searchProducts = async ( term = '', res = response ) => {

  const isMongoId = ObjectId.isValid( term ); // TRUE

  if ( isMongoId ) {
    const product = await Product.findById( term )
                                 .populate('category', 'name');
    return res.json({
      results: ( product ) ? [ product ] : []
    });
  }

  // Regular expression
  const regex = new RegExp( term, 'i' );

  const products = await Product.find({ name: regex, state: true })
                                .populate('category', 'name');

  res.json({
    results: products
  });

};

const search = ( req, res = response ) => {

  const { collection, term } = req.params;

  if ( !allowedCollections.includes( collection) ) {
    return res.status(400).json({
      msg: `The allowed collections are: ${ allowedCollections }`
    })
  };

  switch ( collection ) {
    case 'users':
      
      searchUsers( term, res );

      break;
    case 'categories':

      searchCategories( term, res );

      break;
    case 'products':

      searchProducts( term, res );

      break;
    case 'roles':
      break;
  
    default:
      res.status(500).json({
        msg: `I forgot to do this search`
      });
      break;
  }

};

module.exports = {
  search
};