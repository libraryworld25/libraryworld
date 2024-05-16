const mongoose = require('mongoose');


// function to connect to Oolkar database
const connectDB = async (database) => {
    try {
        console.log("Connecting to Hemangi...");
        await mongoose.connect(database)
        console.log("Connected to Hemangi")
    } catch (error) {
        console.log("Connection failed to Hemangi")
        process.exit(0);
    }
}


module.exports = connectDB;