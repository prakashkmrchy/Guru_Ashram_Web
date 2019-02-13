const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    classTime: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requires: true
    },
    details: {
        type: String,
        required: false
    },
    startingDate: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Courses', courseSchema);