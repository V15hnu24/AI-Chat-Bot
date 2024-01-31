import mongoose from "mongoose";

const turnSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: [true, 'Please add a prompt'],
    },
    response: {
        type: String,
        required: [true, 'Please add a response'],
    },
});

export default mongoose.models.Turn || mongoose.model('Turn', turnSchema);
