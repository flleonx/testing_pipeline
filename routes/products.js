const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, fieldsValidator, isAdminRole, transformCategoryNameToId  } = require('../middlewares');

const { getProducts, 
        getProduct, 
        createProduct, 
        updateProduct, 
        deleteProduct } = require('../controllers/products');

const { productExistenceById } = require('../helpers/db-validators');

const router = Router();

// Get all the products - public service
router.get('/', getProducts );

// Get one prodcut by id - public service
router.get('/:id', [
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( productExistenceById ),
  fieldsValidator
], getProduct );

// Create product - private service (anyone with a valid token)
router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  transformCategoryNameToId,
  fieldsValidator
], createProduct );

// Update product by id - private service (anyone with a valid token)
router.put('/:id', [
  validateJWT,
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( productExistenceById ),
  transformCategoryNameToId,
  fieldsValidator
], updateProduct );

// Delete product by id - private service (Admin)
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( productExistenceById ),
  fieldsValidator
], deleteProduct );

module.exports = router;