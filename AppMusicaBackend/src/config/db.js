const mongoose = require('mongoose');

const uri = "mongodb+srv://cihc2006_db_user:4tXUsaWowMPsZeyb@cluster0.yomolid.mongodb.net/AppMusica?appName=Cluster0";

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

const connectDB = async () => {
    try {
        await mongoose.connect(uri, clientOptions);
        console.log("Connected to Mongo Atlas");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;