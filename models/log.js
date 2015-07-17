// require mongoose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define log schema
var LogSchema = new Schema({
  type: String,
  calories: Number
});

// create and export Log model
var Log = mongoose.model('Log', LogSchema);
module.exports = Log;