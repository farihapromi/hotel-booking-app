import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true }, // Clerk user ID
    username: { type: String, required: true },

    email: { type: String, required: true },

    image: { type: String },
    role: { type: String, enum: ['user', 'hotelOwner'], default: 'user' },
    recentSearchedCities: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
