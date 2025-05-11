require('dotenv').config();
const { MongoClient } = require('mongodb');

let database;

const intDb = (callback) => {
    if (database) {
        console.log('Database already initialized');
        return callback(null, database);
    }

    console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug

    MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((error) => {
            callback(error);
        });
};

const getDatebase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    intDb,
    getDatebase
};
