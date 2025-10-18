import express from 'express';
import clerkWebhooks from '../controllers/clerkWebhooks.js';

const clerkWebHookRouter = express.Router();

// ✅ Use raw body only for this route
clerkWebHookRouter.post('/', clerkWebhooks);

export default clerkWebHookRouter;
