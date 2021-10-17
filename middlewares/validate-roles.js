const { request, response } = require("express");

const isAdminRole = ( req = request, res = response, next ) => {

  if ( !req.authUser ) {
    return res.status(500).json({
      msg: 'It wants to validate the role without validating the token first'
    })
  };

  const { role, name } = req.authUser;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status(401).json({
      msg: `${name} is not admin - can't do this`
    });
  }

  next();
};

const hasRole = ( ...roles ) => {

  return ( req = request, res = response, next ) => {
    
    if ( !req.authUser ) {
      return res.status(500).json({
        msg: 'It wants to validate the role without validating the token first'
      })
    };

    if ( !roles.includes( req.authUser.role ) ) {
      return res.status(401).json({
        msg: `The service requires one of these roles ${ roles }`
      });
    };

    next();
  };

};

module.exports = {
  isAdminRole,
  hasRole
};