import User from '../models/User.js';
import { getAuth } from '@clerk/express';

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req); // must read from token
    if (!userId)
      return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { username, email, image } = req.body;

    // ✅ Upsert the user in MongoDB
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, image },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('✅ User synced to MongoDB:', user.email);
    res.json({ success: true, user });
  } catch (err) {
    console.error('❌ Sync user error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
