import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import AuthRoutes from './routes/AuthRoutes.js';
import StudentRoutes from './routes/StudentRoutes.js';
import FeesRoutes from './routes/FeesRoutes.js'
import LibraryRoutes from './routes/LibraryRoutes.js'
import UserRoutes from './routes/UserRoutes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api/students', StudentRoutes);
app.use('/api/fees', FeesRoutes);
app.use('/api/library',LibraryRoutes);
app.use('/api/user',UserRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
