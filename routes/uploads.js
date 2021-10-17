
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, validateUploadFile } = require('../middlewares');
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateUploadFile, uploadFile );

router.put('/:collection/:id', [
  validateUploadFile,
  check('id', 'It is an invalid ID').isMongoId(),
  check('collection').custom( c => allowedCollections( c , ['users', 'products'] ) ),
  fieldsValidator
], updateImageCloudinary );
// ], updateImage );

router.get('/:collection/:id', [
  check('id', 'It is an invalid ID').isMongoId(),
  check('collection').custom( c => allowedCollections( c , ['users', 'products'] ) ),
  fieldsValidator
], showImage )

module.exports = router;