// auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate users and set req.user
export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Middleware for Admin-only routes
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

// Middleware for Librarian-only routes
export const isLibrarian = (req, res, next) => {
    if (req.user.role !== 'Librarian') {
        return res.status(403).json({ message: 'Access denied. Librarians only.' });
    }
    next();
};

// Middleware for Office Staff-only routes
export const isOfficeStaff = (req, res, next) => {
    if (req.user.role !== 'OfficeStaff') {
        return res.status(403).json({ message: 'Access denied. Office Staff only.' });
    }
    next();
};



// Middleware for Admin or Librarian routes
export const isAdminOrLibrarian = (req, res, next) => {
    const role = req.user.role; // Assuming req.user contains user information
    if (role === 'Admin' || role === 'Librarian') {
        return next(); // User is authorized
    }
    return res.status(403).json({ message: 'Access denied. Admin or Librarian role required.' });
};


// Middleware for Admin or Office Staff routes
export const isAdminOrOfficeStaff = (req, res, next) => {
    const role = req.user.role; // Assuming req.user contains user information
    if (role === 'Admin' || role === 'OfficeStaff') {
        return next(); // User is authorized
    }
    return res.status(403).json({ message: 'Access denied. Admin or Office Staff role required.' });
};


// Middleware for Admin or Office Staff or librarian routes
export const isAdminOfficeStaffOrLibrarian = (req, res, next) => {
    const role = req.user.role; // Assuming `req.user` contains the user's role
    if (role === 'Admin' || role === 'OfficeStaff' || role === 'Librarian') {
        return next(); // User is authorized
    }
    return res.status(403).json({ message: 'Access denied. Admin, Office Staff, or Librarian role required.' });
};
