import mongoose from 'mongoose';

const ChatSessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        ip: String,
    },
    messages: [
        {
            id: Number,
            sender: String,
            text: String,
            timestamp: Number,
        },
    ],
    lastActive: {
        type: Number,
        default: Date.now,
    },
    isAdminTyping: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.ChatSession || mongoose.model('ChatSession', ChatSessionSchema);
