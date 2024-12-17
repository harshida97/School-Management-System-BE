import Library from '../models/Library.js';

// Add a new library record
export const addLibraryRecord = async (req, res) => {
    try {
        // Create a new library record from the request body
        const newRecord = new Library(req.body);
        await newRecord.save(); // Save the record to the database
        res.status(201).json({
            message: 'Library record added successfully',
            data: newRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding library record',
            error: error.message,
        });
    }
};

// Get all library records
export const getLibraryRecords = async (req, res) => {
    try {
        // Find all library records and populate the related student field
        const records = await Library.find()
            .populate('student', 'name') // Assuming there is a relation to the student model
            .populate('book', 'title'); // Assuming there is a relation to the book model
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching library records',
            error: error.message,
        });
    }
};

// Get a single library record by ID
export const getLibraryRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record by ID and populate student and book information
        const record = await Library.findById(id)
            .populate('student', 'name')
            .populate('book', 'title');
        if (!record) {
            return res.status(404).json({
                message: 'Library record not found',
            });
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching library record',
            error: error.message,
        });
    }
};

// Update a library record
export const updateLibraryRecord = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the record by ID and update with the request body
        const updatedRecord = await Library.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecord) {
            return res.status(404).json({
                message: 'Library record not found',
            });
        }
        res.status(200).json({
            message: 'Library record updated successfully',
            data: updatedRecord,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating library record',
            error: error.message,
        });
    }
};

// Delete a library record
export const deleteLibraryRecord = async (req, res) => {
    try {
        const { id } = req.params;
        // Find and delete the record by ID
        const deletedRecord = await Library.findByIdAndDelete(id);
        if (!deletedRecord) {
            return res.status(404).json({
                message: 'Library record not found',
            });
        }
        res.status(200).json({
            message: 'Library record deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting library record',
            error: error.message,
        });
    }
};
