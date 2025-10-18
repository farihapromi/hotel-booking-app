import { getAuth } from '@clerk/express';
import User from '../models/User.js';
// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req); // 👈 function
//     if (!userId)
//       return res
//         .status(401)
//         .json({ success: false, message: 'Not authenticated' });

//     const user = await User.findById(userId);
//     if (!user)
//       return res
//         .status(401)
//         .json({ success: false, message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = getAuth(req); // reads token from Authorization header
//     console.log('🧠 Backend userId:', userId); // DEBUG

//     if (!userId)
//       return res
//         .status(401)
//         .json({ success: false, message: 'User not authenticated' });

//     const user = await User.findById(userId);
//     console.log(user.useremail);
//     if (!user)
//       return res
//         .status(404)
//         .json({ success: false, message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Protect Middleware Error:', error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req); // reads token from Authorization header
    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: 'Not authenticated' });

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
