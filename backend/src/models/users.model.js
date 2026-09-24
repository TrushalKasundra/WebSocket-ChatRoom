import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String, required: true
}

const usersSchema = new Schema({
    name: reqString,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    socketId: reqString,
    room: reqString,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export const usersModel = mongoose.models.Users || new mongoose.model('Users', usersSchema)

