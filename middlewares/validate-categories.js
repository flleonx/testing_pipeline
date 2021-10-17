const { request, response } = require("express");
const { Category } = require("../models");


const transformCategoryNameToId = async ( req = request, res = response, next ) => {

  if ( req.body.category ) {
    const category = await Category.findOne({ name: req.body.category.toUpperCase() });
  
    if ( !category ) {
      return res.status(500).json({
        msg: `The category ${ req.body.category } does not exists`
      });
    };
  
    req.body.category = category._id;
  }

  next();
  
};

module.exports = {
  transformCategoryNameToId
};