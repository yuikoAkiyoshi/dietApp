const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todo: {
        type: String
    },
    point: {
        type: Number
    }
})

module.exports = todoSchema