const jwt = require('jsonwebtoken');

// uid: user identifier
const generateJWT = ( uid = '') => {

  return new Promise( (resolve, reject)  => {

    const payload = { uid };

    jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '4h'
    }, (err , token) => {
      if (err) {
        console.log(err);
        reject('Could not generate the JWT');
      } else {
        resolve(token);
      }
    });

  });
  
};

module.exports = {
  generateJWT
}