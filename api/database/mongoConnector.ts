import mongoose from "mongoose";
require("dotenv").config();

let env = process.env.NODE_ENV;
let dbName: string;

if(env == 'development') {
    dbName = 'test'
} 
else if (env == 'production') {
    dbName = 'prod'
}

mongoose.connection.once('open', () => {
    console.log('Mongo is ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

export const mongoConnect = async () => {
    await mongoose.connect(process.env.MONGODB_URL as string, {
        dbName: dbName
    });
}

export const mongoDisconnect = async () => {
    await mongoose.disconnect();
};