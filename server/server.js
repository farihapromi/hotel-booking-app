import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';

connectDB();
const app = express();
app.use(cors()); //connect backend to frontend
//middleware
app.use(express.json());
app.use(clerkMiddleware());
//API to lsten clerk webhook
app.use('/api/clerk', clerkWebhooks);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send('Api is Working'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
