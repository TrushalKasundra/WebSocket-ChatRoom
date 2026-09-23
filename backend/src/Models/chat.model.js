import mongoose, { Schema } from "mongoose"

const reqString = {
  type: String, required: true
}

const chatSchema = new Schema({
  room: reqString,
  message: reqString,
  author: reqString,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

export const chatModel = mongoose.models.Chat || new mongoose.model('Chat', chatSchema)

