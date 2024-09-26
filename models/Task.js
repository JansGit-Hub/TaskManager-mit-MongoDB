const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false    
    }
})

module.exports = mongoose.model('Task',TaskSchema)