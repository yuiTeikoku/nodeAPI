'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
  id: String,
  category: String,
  maincategory: String,
  taxTarifCode: String,
  suppliername: String,
  weightMeasure: Number,
  weightUnit: String, 
  description: String,
  name: String,
  dateOfSale: String, 
  productPicUrl: String, 
  status: String,
  quantity: Number, 
  UoM: String, 
  currencyCode: String,
  price: Number, 
  width: Number, 
  depth: Number, 
  height: Number,
  dimUnit: String
});

module.exports = mongoose.model('Products', ProductsSchema);
  

