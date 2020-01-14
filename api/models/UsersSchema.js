var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  login: String,
  password: String,
  rest: {type: mongoose.Schema.Types.Mixed, default: {}}
})

module.exports = mongoose.model('Users', UsersSchema);