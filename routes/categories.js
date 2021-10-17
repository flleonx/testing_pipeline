const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, fieldsValidator, isAdminRole } = require('../middlewares');

const { createCategory,
        getCategory,
        getCategories, 
        updateCategory, 
        deleteCategory, } = require('../controllers/categories');

const { categoryExistenceById } = require('../helpers/db-validators');

const router = Router();

// Get all the categories - public service
router.get('/', getCategories );

// Get one category by id - public service
router.get('/:id', [
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( categoryExistenceById ),
  fieldsValidator
], getCategory);

// Create category - private service (anyone with a valid token)
router.post('/', [
  validateJWT,
  check('name', 'Name is required').not().isEmpty(),
  fieldsValidator
], createCategory );

// Update category by id - private service (anyone with a valid token)
router.put('/:id', [
  validateJWT,
  check('id', 'It is an invalid ID').isMongoId(),
  check('name', 'Name is required').not().isEmpty(),
  check('id').custom( categoryExistenceById ),
  fieldsValidator
], updateCategory );

// Delete category by id - private service (Admin)
router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( categoryExistenceById ),
  fieldsValidator
], deleteCategory );

module.exports = router;