// feesRoutes.js
import express from 'express';
import { addFeeRecord, getFeeRecords, updateFeeRecord, deleteFeeRecord } from '../controllers/FeesController.js';
import { protect, isAdmin, isOfficeStaff,isAdminOfficeStaffOrLibrarian } from '../middlewares/AuthMiddleware.js';

const router = express.Router();

// Routes for fee records
router.post('/addfeeremark', protect, isOfficeStaff, addFeeRecord); // Only Office Staff can add
router.get('/getfeerecords',protect,isAdminOfficeStaffOrLibrarian, getFeeRecords); // Any authenticated user can view
router.put('/:id', protect, isOfficeStaff, updateFeeRecord); // Only Office Staff can update
router.delete('/:id',protect, isAdmin, deleteFeeRecord); // Only Admin can delete



export default router;
