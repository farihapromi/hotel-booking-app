import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { clerkMiddleware, requireAuth } from '@clerk/express';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/cloudinary.js';

// Routes & controllers
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { syncUser } from './controllers/syncUserController.js';

connectDB();
connectCloudinary();

const app = express();
app.use(cors());
app.use(express.json());

//  Clerk middleware MUST be first
app.use(clerkMiddleware());

// ✅ Route to sync Clerk user to MongoDB
app.post('/api/sync-user', requireAuth(), syncUser);

// other routes
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

// ✅ Test
app.get('/', (req, res) => res.send('API is Working'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
