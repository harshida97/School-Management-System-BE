import mongoose from 'mongoose';

const FeesSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    feeType: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    remarks: { type: String },
}, { timestamps: true });

export default mongoose.model('Fees', FeesSchema);
 