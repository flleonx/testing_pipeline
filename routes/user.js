
const { Router } = require('express');
const { check } = require('express-validator');

// const { fieldsValidator } = require('../middlewares/fields-validator');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, hasRole } = require('../middlewares/validate-roles');

const {
  fieldsValidator,
  validateJWT,
  isAdminRole,
  hasRole
} = require('../middlewares');

const { roleValidator, checkUniqueEmail, userExistenceById } = require('../helpers/db-validators');

const { getUsers,
        putUsers,
        postUsers,
        deleteUsers,
        patchUsers } = require('../controllers/user');


const router = Router();

router.get("/", getUsers);

router.put("/:id",[
  // check knows if it is a parameter or a body argument
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( userExistenceById ),
  check('role').custom( roleValidator ),
  fieldsValidator
], putUsers);

router.post("/", [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password must be 6 char long').isLength( {min: 6} ),
  check('email', 'Email is wrong').isEmail(),
  check('email').custom( checkUniqueEmail ),
  // check('role', 'It is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( roleValidator ),
  fieldsValidator
], postUsers);

router.delete("/:id",[
  validateJWT,
  // isAdminRole,
  hasRole('ADMIN_ROLE', 'SALE_ROLE'),
  check('id', 'It is an invalid ID').isMongoId(),
  check('id').custom( userExistenceById ),
  fieldsValidator
], deleteUsers);

router.patch("/", patchUsers);

module.exports = router;