import mongoose from 'mongoose';

const connectDB = async (dbURL)=> {
  try { 
    if (!dbURL) {
      throw new Error('MONGOOSE_URL is not defined');
    }
    
    console.log('Connecting to MongoDB...');

    await mongoose.connect(dbURL, {
      dbName: 'chatroom',
      serverSelectionTimeoutMS: 10000,
    });

    console.log('Connected Successfully');
    return true;
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      console.error('Connection Failed', error.message);
    } else {
      console.error('Connection Failed', error);
    }
    return false;
  }
};

export default connectDB;

