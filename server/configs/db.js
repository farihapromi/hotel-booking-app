import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGO_URI}/hotel-booking`
    );

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDB;
