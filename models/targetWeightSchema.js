const mongoose = require('mongoose')

const targetWeightSchema = new mongoose.Schema({
    targetWeight: {
        type: Number
    }
})

module.exports = targetWeightSchema