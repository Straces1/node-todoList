const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },
    checked: {
        type: Boolean,
        required: false,
    },
    user_id: {
        type: String,
        required: false
    }

}, {timestamps: true})

const ToDo = mongoose.model('ToDo', todoSchema);
module.exports = ToDo;