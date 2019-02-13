const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const instituteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gallery', instituteSchema);