var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpeechSchema = new Schema({
    sessionName:{type: String, required: true },
    timer: {type: String},
    crutch: {type: String},
    grammar: {type: String },
    speechDate: {type: Date, default: Date.now()}
});


module.exports = mongoose.model('Speech', SpeechSchema);