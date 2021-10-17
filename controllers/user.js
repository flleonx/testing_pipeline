const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

  // const { q, nombre = 'default' } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  // I wanna execute these promises simoultaneously, because
  // they don't have dependencies between them.
  const [ total, users ] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
        .skip( parseInt( from) )
        .limit( parseInt( limit ) )
  ]);

  res.json({
    total,
    users
  });
};

const putUsers = async (req = request, res = response) => {

  const { id } = req.params;
  const { _id, password, google, email, ...remaining } = req.body;

  if ( password ) {

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    remaining.password = bcryptjs.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( id, remaining );

  res.json(user);
};

const postUsers = async (req = request, res = response) => {

  const { name, email, password, role } = req.body;

  const user = new User( {name, email, password, role } );

  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // Save in DB
  await user.save();

  res.json({
    user
  });
};

const deleteUsers = async (req = request, res = response) => {

  const { id } = req.params;

  const user = await User.findByIdAndUpdate( id, { state: false } );

  res.json( user );
};

const patchUsers = (req = request, res = response) => {
  res.json({
    msg: 'patch API -c'
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers
}