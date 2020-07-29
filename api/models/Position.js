// Product.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Product
let Product = new Schema({
  Instrument: {
    type: String
  },
  Account: {
    type: String
  },
  Agreement: {
    type: Number
  }
},{
    collection: 'holdings'
});

module.exports = mongoose.model('Position', Position);