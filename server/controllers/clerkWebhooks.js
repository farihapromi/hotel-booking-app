import User from '../models/User.js';
import { Webhook } from 'svix';
const clerkWebhooks = async (req, res) => {
  try {
    //create a svix instance with clerk webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //hgetting headersa
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    };
    //verifying headers
    await whook.verify(JSON.stringify(req.body, headers));
    //getting data from req body
    const { data, type } = req.body;
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email,
      username: data.first_name + ' ' + data.last_name,
      image: data.image - url,
    };
  } catch (error) {}
};
