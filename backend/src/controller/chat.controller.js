import { chatModel } from "../Models/chat.model.js";

export const chatMessages = async (req, res) => {
  try {
    const room = req.body.room;
    const chat = await chatModel.find({ room }).limit(10).exec();

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 

}