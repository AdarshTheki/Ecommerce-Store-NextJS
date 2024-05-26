import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL + '/E-Commerce_Store' || '');
        isConnected = true;
        console.log('MongoDB is connected');
    } catch (err: any) {
        console.log('MongoDB connection failed', err?.message);
    }
};
