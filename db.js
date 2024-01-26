// db.js

import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://rehan:iloveyouswaleha@notefly.jkls6yg.mongodb.net/Notefly?retryWrites=true&w=majority';

const connectToMongo = async () => {
    try {
        console.log('Trying to connect to MongoDB');
        await mongoose.connect(mongoURI, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

export { connectToMongo };
