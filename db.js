const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017';



const connectToMongo =  () => {
    console.log('Trying to MongoDB');
    mongoose.connect(mongoURI);
    console.log('Connect to mongo db');
}; 

module.exports = connectToMongo;