import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    book: { type: String, required: true },
    borrowDate: { type: Date, required: true },
    returnDate: { type: Date },
    status: { type: String, enum: ['Borrowed', 'Returned'], required: true },
}, { timestamps: true });

export default mongoose.model('Library', librarySchema);
