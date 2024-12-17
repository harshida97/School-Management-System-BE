import express from 'express';
import { addLibraryRecord, getLibraryRecords, updateLibraryRecord, deleteLibraryRecord, getLibraryRecordById } from '../controllers/LibraryController.js';  // Import the new controller function
import { protect, isAdminOrLibrarian, isAdminOfficeStaffOrLibrarian, isLibrarian } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Routes for library records
router.post('/addlibraryrecord', protect, isLibrarian, addLibraryRecord); // Only Librarian can add
router.get('/getlibraryrecords', protect, isAdminOfficeStaffOrLibrarian, getLibraryRecords); // Any authenticated user can view
router.put('/:id', protect, isLibrarian, updateLibraryRecord); // Only Librarian can update
router.delete('/:id', protect, isAdminOrLibrarian, deleteLibraryRecord); // Only Admin can delete

// Add the correct GET route to fetch a single library record by ID
router.get('/:id', protect, getLibraryRecordById); // Protect the route and use the controller function to handle it

export default router;
