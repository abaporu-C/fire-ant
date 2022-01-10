const mongoose = require('mongoose');

module.exports = {
    init: () => {        

        const dbOptions = {
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        //MongoDB Atlas URI
        const mongo_uri = 'mongodb+srv://fire-ant:3un40s0u4b4p0ru!@react-server.j5m6o.mongodb.net/test';

        //Connection and options
        mongoose.connect(mongo_uri, dbOptions).catch(err => {
            //mongoose.connection
            console.log(err)
        });
        
        mongoose.set('autoCreate', true);        

        //Events
        mongoose.connection.on('connected', () => {
            console.log('Connected to mongoDB')
        })

        mongoose.connection.on('error', (err) => {
            console.log(err)
        })

        mongoose.connection.on('disconnect', () => {
            console.log('MongoDB disconnected');
        })

        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected to MongoDB')
        })

        mongoose.connection.on('reconnectFailed', () => {
            console.log('Failed to reconnect to MongoDB')
        })
    }
}