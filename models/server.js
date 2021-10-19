const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection, dbClose } = require("../database/config");

class Server {
  constructor( port = 3000 ) {
    this.app = express();
    this.port = port;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      users: '/api/users',
      uploads: '/api/uploads'
    };

    // DB connection
    this.database();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  };

  async database() {
    await dbConnection();
    return "OK"
  };

  async databaseclose() {
    await dbClose();
    return "OUT"
  };

  middlewares() {

    // CORS
    this.app.use( cors() );

    // Reading and Parsing
    this.app.use( express.json() );

    // Public directory
    this.app.use( express.static('./public') );

    // File upload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));

  };

  routes() {

    // Routes
    this.app.use( this.paths.auth, require('../routes/auth'));
    this.app.use( this.paths.categories, require('../routes/categories'));
    this.app.use( this.paths.products, require('../routes/products'));
    this.app.use( this.paths.search, require('../routes/search'));
    this.app.use( this.paths.users, require('../routes/user'));
    this.app.use( this.paths.uploads, require('../routes/uploads'));

  };

  // listen() {
  //  this.app.listen(this.port, () => {
  //    console.log(`Server running on port`, this.port);
  //  });
  // };

  open() {
    return new Promise( (resolve, reject) => {
       const listener = this.app.listen(this.port, (err) => {
         if (err) reject(err);
         resolve({
           port: listener.address().port,
           stop: () => listener.close((err) => {
             console.log('El servidor se cerró')
           }),
           datab: () => this.database(),
           databclose: () => this.databaseclose()
         })
       });
     });
   };
};

module.exports = Server;
