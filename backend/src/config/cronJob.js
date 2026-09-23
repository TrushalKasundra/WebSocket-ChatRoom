import cron from 'node-cron'
import { chatModel } from '../Models/chat.model.js';
import { usersModel } from '../Models/users.model.js';

export const cronJob = () => {

    // Truncate chat and user collections every 24 hours at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            await chatModel.deleteMany({});
            await usersModel.deleteMany({});
            console.log('Collections truncated successfully');
        } catch (err) {
            console.error('Failed to truncate collections:', err);
        }
    });
}