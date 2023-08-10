const mongoose = require('mongoose');

exports.connectDB = async () => {
    try 
    {
        const connect = await mongoose.connect(process.env.uri);

        console.log('Connected to MongoDB', connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

