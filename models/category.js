
const { Schema, model } = require('mongoose');

const CategorySchema = Schema({

  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, 'State is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

});

// toJSON built-in method
CategorySchema.methods.toJSON = function() {
  const { __v, state, ...data } = this.toObject(); // toObject built-in method
  return data;
};

module.exports = model( "Category", CategorySchema );