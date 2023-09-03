const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME;

async function connect() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
        console.log('Connect mongodb successfully!');
    } catch (error) {
        console.log('Connect mongodb failure!');
    }
}

module.exports = { connect };