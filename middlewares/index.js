
const fieldsValidator = require('./fields-validator');
const validateJWT = require('./validate-jwt');
const validateRoles = require('./validate-roles');
const validateCategories = require('./validate-categories');
const validateFile = require('./validate-file');

module.exports = {
  ...fieldsValidator,
  ...validateJWT,
  ...validateRoles,
  ...validateCategories,
  ...validateFile
};