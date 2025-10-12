import User from '../models/User.js';
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: 'User is not authenticaed' });
  } else {
    const user = await User.finsById(userId);
    req.user = user;
    next();
  }
};
