import mongoose from 'mongoose';
const hotelSchema = new mongoose.Schema(
  {
    name: { type: string, required: true },
    address: { type: string, required: true },
    contact: { type: string, required: true },
    owner: { type: string, required: true, ref: 'User' },
    city: { type: string, required: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
