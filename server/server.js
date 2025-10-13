import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

connectDB();
connectCloudinary(); //clodunary for image uploads,store images
const app = express();
app.use(cors()); //connect backend to frontend
//middleware
app.use(express.json());
app.use(clerkMiddleware());
//API to lsten clerk webhook
app.use('/api/clerk', clerkWebhooks);
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('api//bookings', bookingRouter);

app.get('/', (req, res) => res.send('Api is Working'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
