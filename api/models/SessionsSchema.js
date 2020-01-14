var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionsSchema = new Schema({
	userId: String,
	timeIn: {type: Number, default: -1}
});

module.exports = mongoose.model("Sessions", SessionsSchema)