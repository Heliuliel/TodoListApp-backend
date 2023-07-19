const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:false 
    },
    status:{
        type:String,
        required:true,
        enum: ['complete', 'incomplete'],
    }
},{timestamps:true})

module.exports = mongoose.model('Task',taskSchema)