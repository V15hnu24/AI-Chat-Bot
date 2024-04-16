import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    numberOfTurns: {
        type: Number,
        default: 0,
    },
    turnIds: {
        type: Array,
        default: [],
    },
    head: {
        type: String,
        default: '',
    },
    selectedSubject: {
        type: String,
        default: '',
    },
});

export default mongoose.models.Thread || mongoose.model('Thread', threadSchema);
