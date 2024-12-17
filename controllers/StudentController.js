import Student from '../models/Student.js';

// Add a new student
export const addStudent = async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get student by ID
export const getStudentById = async (req, res) => {
    try {
      const { id } = req.params; // Extract the id from the URL parameter
      const student = await Student.findById(id); // Find student by ID
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.json(student); // Return the student data if found
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update student details
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student details
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
