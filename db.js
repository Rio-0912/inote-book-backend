const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://rehan:iloveyouswaleha@notefly.jkls6yg.mongodb.net/Notefly?retryWrites=true&w=majority';



const connectToMongo =  () => {
    console.log('Trying to MongoDB');
    mongoose.connect(mongoURI);
    console.log('Connect to mongo db');
}; 

module.exports = connectToMongo;