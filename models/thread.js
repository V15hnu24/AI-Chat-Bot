import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    numberOfTurns: {
        type: Number,
    },
    turnIds: {
        type: Array,
    },
});

export default mongoose.models.Thread || mongoose.model('Thread', threadSchema);
