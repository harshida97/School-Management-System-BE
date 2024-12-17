// routes/userRoutes.js
import express from 'express';
import { protect, isAdmin,isAdminOrLibrarian,isOfficeStaff,isAdminOrOfficeStaff,isAdminOfficeStaffOrLibrarian } from '../middlewares/AuthMiddleware.js';
import { getAllUsers, createUser, updateUser, deleteUser,getUserById } from '../controllers/UserController.js';
import Student from '../models/Student.js';
import Fees from '../models/Fees.js'
import Library from '../models/Library.js'; 


const router = express.Router();

// Admin routes
router.get('/all-users', protect, isAdmin, getAllUsers); // Only Admins can view all users
router.post('/create-user', protect, isAdmin, createUser); // Only Admins can create users
router.put('/update-user/:id', protect, isAdmin, updateUser); // Only Admins can update users
router.get('/:id',protect, isAdmin, getUserById);
router.delete('/delete-user/:id', protect, isAdmin, deleteUser); // Only Admins can delete users


// route for admin or librarian 
router.get('/library-history', protect, isAdminOrLibrarian, async (req, res) => {
    try {
        const history = await Library.find()
            .populate('student', 'name')
            .populate('book', 'title');
        res.status(200).json({ message: 'Library history', data: history });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching library history', error: error.message });
    }
});



// Fetch student details (all students) for admin or office staff or librarian
router.get('/student-details', protect, isAdminOfficeStaffOrLibrarian, async (req, res) => {
    try {
        const role = req.user.role;

        // Define fields to select based on role
        let fieldsToSelect = 'name class division'; // Default fields for Librarian
        if (role === 'Admin' || role === 'OfficeStaff') {
            fieldsToSelect = 'name class division email contact '; // Admin and Office Staff get full details
        }

        // Fetch students with role-specific fields
        const students = await Student.find().select(fieldsToSelect);

        res.status(200).json({
            message: `Student details for ${role}`,
            data: students,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student details', error: error.message });
    }
});

// Get a single library record by ID for admin or librarian
router.get('/:id',protect,isAdminOrLibrarian,async (req, res) => {
    try {
      const libraryRecord = await Library.findById(req.params.id);
      if (!libraryRecord) return res.status(404).json({ message: 'Record not found' });
      res.json(libraryRecord);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });



// Fetch fees history for admin and office staff
router.get('/fees-history', protect, isAdminOrOfficeStaff, async (req, res) => {
    try {
        const feesHistory = await Fees.find()
            .populate('student', 'name email contact') // Populating student details
            .select('feeType amount paymentDate remarks'); // Selecting relevant fields

        res.status(200).json({ message: 'Fees history for Admin and Office Staff', data: feesHistory });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fees history', error: error.message });
    }
});

// Fetch library records for office staff
router.get('/library-reviews', protect, isOfficeStaff, async (req, res) => {
    try {
        const libraryRecords = await Library.find()
            .populate('student', 'name email')  // Populating student details
            .select('bookName borrowDate returnDate status'); // Select relevant fields

        res.status(200).json({ message: 'Library records for Office Staff', data: libraryRecords });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching library records', error: error.message });
    }
});


export default router;


