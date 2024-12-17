import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true },
    division: { type: String, required: true},
    age: { type: Number, required: true },
    email: { type: String, required: true},
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
