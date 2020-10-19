const mongoose = require('mongoose')

const pointSchema = new mongoose.Schema({
    totalPoint: {
        type: Number
    }
})

module.exports = pointSchema