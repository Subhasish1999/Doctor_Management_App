const mongoose = require('mongoose')
const colors = require('colors')

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected to ${mongoose.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`MongoDb Server Issue ${error}`.bgRed.white);
    }
}

module.exports = connectDb;