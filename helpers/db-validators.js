const { Role, User, Category, Product } = require('../models');
const { collection } = require('../models/category');

const roleValidator = async (role = '') => {
  const existsRole = await Role.findOne({ role });
  if ( !existsRole ) {
    throw new Error(`Role ${role} does not exist in DB`);
  }
};

// Check if email exists
const checkUniqueEmail = async (email = '') => {
  const notUniqueEmail = await User.findOne({ email });
  if ( notUniqueEmail ) {
    throw new Error(`Email: ${email} already exists`);
  }
};

const userExistenceById = async (id = '') => {
  const userExists = await User.findById( id );
  if ( !userExists ) {
    throw new Error(`Id: ${id} doesn't exist`);
  }
};

// Check if the category exists
const categoryExistenceById = async (id = '') => {
  const categoryExists = await Category.findById( id );
  if ( !categoryExists ) {
    throw new Error(`Category id: ${id} doesn't exist`);
  }
};

// Check if the product exists
const productExistenceById = async (id = '') => {
  const productExists = await Product.findById( id );
  if ( !productExists ) {
    throw new Error(`Product id: ${id} doesn't exist`);
  }
};

// Validate allowed collections
const allowedCollections = ( (collection = '', collections = []) => {

  const included = collections.includes( collection );

  if ( !included ) {
    throw new Error(`The collection: ${ collection } is not allowed - ${ collections }`);
  };

  return true;

});

module.exports = {
  roleValidator,
  checkUniqueEmail,
  userExistenceById,
  categoryExistenceById,
  productExistenceById,
  allowedCollections
};