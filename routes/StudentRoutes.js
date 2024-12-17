import express from 'express';
import { addStudent, getStudents,updateStudent,deleteStudent,getStudentById } from '../controllers/StudentController.js';
import { protect,isOfficeStaff,isAdminOrOfficeStaff ,isAdminOfficeStaffOrLibrarian} from '../middlewares/AuthMiddleware.js';

const router = express.Router();

router.post('/addstudent',protect,isOfficeStaff,addStudent);
router.get('/getstudents',protect,isAdminOfficeStaffOrLibrarian,getStudents);
router.get('/:id',protect,isOfficeStaff, getStudentById);
router.put('/:id',protect,isOfficeStaff, updateStudent); // Update student details
router.delete('/:id',protect,isAdminOrOfficeStaff, deleteStudent); // Delete student details

export default router;
