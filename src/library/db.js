import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://vsashwin364:Es242PcpvzOVG2yp@cluster0.ifduk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

if (!MONGODB_URI) {
    throw new Error('please define mongo url');

}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, Promise: null };
}


async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        })
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;