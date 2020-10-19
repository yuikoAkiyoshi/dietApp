const mongoose = require('mongoose')

const giftSchema = new mongoose.Schema({
    name: {
        type: String
    },
    point: {
        type: Number
    },
})

module.exports = giftSchema