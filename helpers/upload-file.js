const path = require('path');
const { v4: uuidv4 } = require('uuid');

const loadFile = ( files, allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

  return new Promise( (resolve, reject) => {

    const { file } = files;
    const cutName = file.name.split('.');
    const extension = cutName[ cutName.length - 1 ];
  
    // Validate the extension
    if ( !allowedExtensions.includes(extension) ) {
      return reject( `The extension ${extension} is not allowed - ${ allowedExtensions }` );
    };
  
    const temporalName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', folder, temporalName );
  
    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      };
  
      resolve(temporalName);
    });

  });

};

module.exports = {
  loadFile
};