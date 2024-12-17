import Fees from '../models/Fees.js';

// Add a new fee record
export const addFeeRecord = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log request data
        const newFee = new Fees(req.body);
        await newFee.save();
        res.status(201).json({ message: 'Fee record added successfully', data: newFee });
    } catch (error) {
        console.error("Error adding fee record:", error.message); // Log error message
        res.status(500).json({ message: 'Error adding fee record', error: error.message });
    }
};

// Get fee records with pagination
export const getFeeRecords = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Defaults to page 1 with 10 records per page
    try {
        const records = await Fees.find()
            .populate('student', 'name class division')  // Assuming student relation exists
            .limit(limit * 1)            // Convert limit to a number
            .skip((page - 1) * limit);   // Skip the number of records for the current page

        // To get the total count of records (for pagination)
        const totalRecords = await Fees.countDocuments();

        res.status(200).json({
            records,
            totalPages: Math.ceil(totalRecords / limit), // Calculate total number of pages
            currentPage: parseInt(page),                 // Current page number
            totalRecords,                                // Total records count
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fee records', error: error.message });
    }
};

// Update a fee record
export const updateFeeRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecord = await Fees.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Fee record not found' });
        }
        res.status(200).json({ message: 'Fee record updated successfully', data: updatedRecord });
    } catch (error) {
        res.status(500).json({ message: 'Error updating fee record', error: error.message });
    }
};

// Delete a fee record
export const deleteFeeRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecord = await Fees.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Fee record not found' });
        }
        res.status(200).json({ message: 'Fee record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fee record', error: error.message });
    }
};

