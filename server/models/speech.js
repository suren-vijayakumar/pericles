var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//The speech Schema will contain the speeches under each session

var SpeechSchema = new Schema({
    sessionName:{type: String, required: true },
    speaker: [{
        name:{type: String},
        timer: {type: String},
        crutch: {type: String},
        grammar: {type: String},
        speechDate: {type: Date, default: Date.now()}
    }]
});


module.exports = mongoose.model('Speech', SpeechSchema);