import User from '../models/User.js';
import { Webhook } from 'svix';
import connectDB from '../configs/db.js';

const clerkWebhooks = async (req, res) => {
  console.log('🔥 Clerk webhook HIT');

  try {
    await connectDB(); // make sure DB is connected

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Read raw body manually
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks);

    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };

    const event = whook.verify(rawBody, headers);
    const { data, type } = event;

    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid payload' });
    }

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || '',
      username: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      image: data.image_url || '',
      role: 'user',
    };

    switch (type) {
      case 'user.created':
        await User.create(userData);
        console.log('✅ User created:', userData.email);
        break;
      case 'user.updated':
        await User.findByIdAndUpdate(userData._id, userData, { upsert: true });
        console.log('🔄 User updated:', userData.email);
        break;
      case 'user.deleted':
        await User.findByIdAndDelete(userData._id);
        console.log('❌ User deleted:', userData.email);
        break;
      default:
        console.log('ℹ️ Unhandled event type:', type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ Webhook Error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
