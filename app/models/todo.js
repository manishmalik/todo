//load the things we need
var mongoose = require('mongoose');

//define the schema for todo model
var todoSchema = mongoose.Schema({
    task                : String,
    isCompleted: { 
        type            : Boolean,
        default         : false 
    },
    user                : {
        type            : mongoose.Schema.ObjectId,
        ref             :"User"
    },
    targetDate          : {
        type            : Date
    },
    location            : String,
    setDate             : {
        type            : Date,
        default         : Date.now
    }
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('todo', todoSchema);