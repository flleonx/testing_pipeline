const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      msg: 'There is not token in the request'
    });
  };

  try {
    
    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const authUser = await User.findById( uid );

    if ( !authUser ) {
      return res.status(401).json({
        msg: 'Invalid token - user does not exist in DB'
      });
    }

    // Verify if authUser state = true
    if ( !authUser.state ) {
      return res.status(401).json({
        msg: 'Invalid token - user state: false'
      });
    };

    req.authUser = authUser;

    next();
    
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    });
  };

};

module.exports = {
  validateJWT
};