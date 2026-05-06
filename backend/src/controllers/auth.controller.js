import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, 'All fields are required');
  }

  if (!['teacher', 'principal'].includes(role)) {
    throw new ApiError(400, 'Role must be teacher or principal');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists with this email');
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken(user._id);

  res.status(201).json(
    new ApiResponse(201, {
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    }, 'Registration successful')
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  res.json(
    new ApiResponse(200, {
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    }, 'Login successful')
  );
});

export const getMe = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, req.user, 'User fetched'));
});