const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.ClOUDINARY_URL );

const { request, response } = require("express");
const { loadFile } = require('../helpers');
const { User, Product } = require('../models');

const uploadFile = async ( req = request, res = response ) => {

  try {
    // Pictures
    // const name = await loadFile( req.files, ['txt', 'md'], 'textos' );
    const name = await loadFile( req.files );
  
    res.json({ name });
    
  } catch (msg) {
    res.status(400).json({
      msg
    });
  }

};

const updateImage = async ( req =request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      
      model = await User.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no user with id: ${ id }`
        });
      };

    break;
    
    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no product with id: ${ id }`
        });
      };

    break;
  
    default:
      return res.status(500).json({ msg: `I forgot to validate this` });
  };

  // Clean old images
  if ( model.img ) {
    // Delete the image on the server
    const imagePath = path.join( __dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( imagePath ) ) {
      fs.unlinkSync( imagePath )
    };
  };

  model.img = await loadFile( req.files, undefined, collection );

  await model.save();

  res.json({
    model
  });

};

const showImage = async ( req = request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      
      model = await User.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no user with id: ${ id }`
        });
      };

    break;
    
    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no product with id: ${ id }`
        });
      };

    break;
  
    default:
      return res.status(500).json({ msg: `I forgot to validate this` });
  };

  // Clean old images
  if ( model.img ) {
    // Delete the image on the server
    const imagePath = path.join( __dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( imagePath ) ) {
      return res.sendFile( imagePath );
    };
  };

  const placeHolder = path.join( __dirname, '../assets/no-image.jpg' );
  res.sendFile( placeHolder );

};

const updateImageCloudinary = async ( req =request, res = response ) => {

  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'users':
      
      model = await User.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no user with id: ${ id }`
        });
      };

    break;
    
    case 'products':

      model = await Product.findById( id );
      if ( !model ) {
        return res.status(400).json({
          msg: `There is no product with id: ${ id }`
        });
      };

    break;
  
    default:
      return res.status(500).json({ msg: `I forgot to validate this` });
  };

  // Clean old images
  if ( model.img ) {

    const nameArr = model.img.split('/');
    const [ public_id ] = nameArr[nameArr.length - 1].split('.');
    cloudinary.uploader.destroy( public_id );

  };

  const { tempFilePath } = req.files.file;
  const { secure_url } =  await cloudinary.uploader.upload( tempFilePath );

  model.img = secure_url;
  await model.save();

  res.json({
    model
  });

};

module.exports = {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudinary
};