import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db';
connectDB();
const app = express();
app.use(cors()); //connect backend to frontend
app.get('/', (req, res) => res.send('Api is Working'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
