var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
	userId: String,
	product: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Cart", CartSchema)