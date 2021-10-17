const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    console.time('DB CONNECTION')

    await mongoose.connect( process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('DB connected');
  console.timeEnd('DB CONNECTION')

  } catch (error) {
    console.log(error);
    throw new Error('Error trying to connect to DB');
  }

};

const dbClose = async () => {

  try {

    await mongoose.disconnect();

    console.log('DB out');

  } catch (error) {
    console.log(error);
    throw new Error('Error trying to disconnect to DB');
  }

};

module.exports = {
  dbConnection,
  dbClose
};
