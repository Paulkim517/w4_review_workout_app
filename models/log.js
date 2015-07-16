var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
  type: String,
  calories: Number
});

var Log = mongoose.model('Log', LogSchema);
module.exports = Log;