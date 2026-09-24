import { chatModel } from '../src/models/chat.model.js';
import { usersModel } from '../src/models/users.model.js';
import connectDB from '../src/config/db.js';
import 'dotenv/config';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({
            message: 'Method not allowed'
        });
    }

    // Only allow Vercel cron requests — reject everything else
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await connectDB(process.env.MONGOOSE_URL);

        await chatModel.deleteMany({});
        await usersModel.deleteMany({});

        console.log('Chat and user collections cleared');

        return res.status(200).json({
            success: true,
            message: 'Collections cleared successfully'
        });
    } catch (error) {
        console.error('Cleanup failed:', error);

        return res.status(500).json({
            success: false,
            message: 'Cleanup failed'
        });
    }
}
