const mongoose = require('mongoose')

const weightSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    weight: {
        type: Number
    }
})

module.exports = weightSchema