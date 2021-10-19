require('dotenv').config();
const chai = require('chai');
const chaiHtpp = require('chai-http');
const axios = require('axios');

// const Server = require('../models/server');

chai.use(require('chai-like'));
chai.use(require('chai-things'));

const BASE_URL = process.env.BASE_URL;

// Assertion style
const expect = chai.expect;

chai.use(chaiHtpp);

describe('GET /api/users/', () => {

  let server = new Server(3000);

   before(async () => {
       server = await server.open();
       await server.datab();
     });
   after( async () => {
       await server.databclose();
       await server.stop();
     });
  it('It should GET all users', async () => {

    try {
      const result = await axios.get(`${BASE_URL}/api/users`);
      // console.log(result.data)

      expect(result).to.have.status(200);
      expect(result.data).to.be.an('object');
      expect(result.data).to.have.property('total').and.to.be.a('number');
      expect(result.data).to.have.property('users').and.to.be.a('array');

      if ( result.data.users.length !== 0 ) {
        const testObject = result.data.users[0];
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('role').and.to.be.a('string');
        expect(testObject).to.have.property('state').and.to.be.a('boolean');
        expect(testObject).to.have.property('google').and.to.be.a('boolean');
        expect(testObject).to.have.property('img').and.to.be.a('string');
        expect(testObject).to.have.property('uid').and.to.be.a('string');
      } else {
        expect(result.data.users).to.be([]);
      }
      // expect(result.data.users).to.have.length.of.at.least(1).that.deep.contains.something.like({
        //   name: 'test1',
        //   email: 'ax@b.com',
        //   role: 'ADMIN_ROLE',
        //   state: true,
        //   google: false,
        //   img: 'd8b71df8-c7c0-439d-961b-31b3791b5133.jpg',
        //   uid: '614df92b2c3e446fcc6d5f78'
        // });

    } catch (error) {
      if ( error instanceof Error ) throw new Error(error.message);
    }

  });

  it('It should GET all users2', async () => {

    try {
      const result = await axios.get(`${BASE_URL}/api/users`);
      // console.log(result.data)

      expect(result).to.have.status(200);
      expect(result.data).to.be.an('object');
      expect(result.data).to.have.property('total').and.to.be.a('number');
      expect(result.data).to.have.property('users').and.to.be.a('array');

      if ( result.data.users.length !== 0 ) {
        const testObject = result.data.users[0];
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('role').and.to.be.a('string');
        expect(testObject).to.have.property('state').and.to.be.a('boolean');
        expect(testObject).to.have.property('google').and.to.be.a('boolean');
        expect(testObject).to.have.property('img').and.to.be.a('string');
        expect(testObject).to.have.property('uid').and.to.be.a('string');
      } else {
        expect(result.data.users).to.be([]);
      }
      // expect(result.data.users).to.have.length.of.at.least(1).that.deep.contains.something.like({
        //   name: 'test1',
        //   email: 'ax@b.com',
        //   role: 'ADMIN_ROLE',
        //   state: true,
        //   google: false,
        //   img: 'd8b71df8-c7c0-439d-961b-31b3791b5133.jpg',
        //   uid: '614df92b2c3e446fcc6d5f78'
        // });

    } catch (error) {
      if ( error instanceof Error ) throw new Error(error.message);
    }

  });

  it('It should GET all users3', async () => {

    try {
      const result = await axios.get(`${BASE_URL}/api/users`);
      // console.log(result.data)

      expect(result).to.have.status(200);
      expect(result.data).to.be.an('object');
      expect(result.data).to.have.property('total').and.to.be.a('number');
      expect(result.data).to.have.property('users').and.to.be.a('array');

      if ( result.data.users.length !== 0 ) {
        const testObject = result.data.users[0];
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('email').and.to.be.a('string');
        expect(testObject).to.have.property('role').and.to.be.a('string');
        expect(testObject).to.have.property('state').and.to.be.a('boolean');
        expect(testObject).to.have.property('google').and.to.be.a('boolean');
        expect(testObject).to.have.property('img').and.to.be.a('string');
        expect(testObject).to.have.property('uid').and.to.be.a('string');
      } else {
        expect(result.data.users).to.be([]);
      }
      // expect(result.data.users).to.have.length.of.at.least(1).that.deep.contains.something.like({
        //   name: 'test1',
        //   email: 'ax@b.com',
        //   role: 'ADMIN_ROLE',
        //   state: true,
        //   google: false,
        //   img: 'd8b71df8-c7c0-439d-961b-31b3791b5133.jpg',
        //   uid: '614df92b2c3e446fcc6d5f78'
        // });

    } catch (error) {
      if ( error instanceof Error ) throw new Error(error.message);
    }

  });


});
