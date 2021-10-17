const { request, response } = require("express");
const { Category } = require('../models');


// getCategories - paginated - total - populate

const getCategories = async (req = request, res = response ) => {

  const { from = 0, limit = 10 } = req.params;
  const query = { state: true }

  const [total, categories ] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
            .populate('user', 'name')
            .skip( Number(from) )
            .limit( Number(limit) )
  ]);

  res.status(200).json({
    total,
    categories
  });

};

// getCategory - populate - {}

const getCategory = async (req = request, res = response ) => {

  const { id } = req.params;

  const category = await Category
                           .findById( id )
                           .populate('user', 'name')

  res.status(200).json({
    category
  });

};


const createCategory = async ( req = request, res = response) => {

  const name = req.body.name.toUpperCase();

  const dbCategory = await Category.findOne({ name });

  if ( dbCategory ) {
    return res.status(400).json({
      msg: `The category ${ dbCategory.name } already exists`
    });
  }

  // Generate the data to save
  const data = {
    name,
    user: req.authUser._id
  }

  const category = new Category( data );

  // Save in DB
  await category.save();

  res.status(201).json(category);

};

// updateCategory

const updateCategory = async ( req = request, res = response ) => {

  const { id } = req.params;

  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.authUser._id;

  const existsName = await Category.find({ name: data.name });

  if ( existsName[0] ) {
    return res.status(400).json({
      msg: `The category name: ${ data.name } already exists`
    });
  };

  const updatedCategory = await Category.findByIdAndUpdate( id, data, { new: true });

  res.status(200).json({
    updatedCategory
  });

};

// deleteCategory - state: false
const deleteCategory = async ( req = request, res = response ) => {

  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndUpdate( id, { state: false }, { new: true });
  
  res.status(200).json({
    deletedCategory
  });

};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}