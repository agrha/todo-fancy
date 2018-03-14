const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
    title:String,
    action:String,
    priority:String,
    status:String 
})

module.exports = mongoose.model('todo',todoSchema)