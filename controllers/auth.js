const { response, request } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    // check if email exists
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(400).json({
        msg: 'User / Password are not correct - email'
      });
    };

    // user is status is true

    if ( !user.state ) {
      return res.status(400).json({
        msg: 'User / Password are not correct - state: false'
      });
    };

    // check the password
    const validPassword = bcryptjs.compareSync( password, user.password );
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'User / Password are not correct - state: password'
      });
    };
    // generate JSW
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Talk with the admin'
    });
  }
  
};

const googleSignIn = async ( req = request, res = response ) => {

  const { id_token } = req.body;

  try {

    const { name, img, email } = await googleVerify( id_token );

    let user = await User.findOne({ email });

    if ( !user ) {
      // I have to create it

      const data = {
        name,
        email,
        password: 'default',
        img,
        google: true
      };


      user = new User( data );
      await user.save();
    };

    // user in DB
    if ( !user.state ) {
      return res.status(401).json({
        msg: 'Talk with the admin - blocked user'
      });
    };

    // generate JSW
    const token = await generateJWT( user.id );

    res.json({
      user,
      token
    });

  } catch (error) {
    res.status(400).json({
      msg: 'The token could not be verified'
    });
  };


};

module.exports = {
  login,
  googleSignIn
};