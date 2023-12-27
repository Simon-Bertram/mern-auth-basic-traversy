import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc  Authenticate user & get token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc   Register a new user
// route   POST /api/users/register
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // If user is created, return 201 and the user object
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user is not created, return 400 and throw an error
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Get user profile
// route   GET /api/users/profile
// access  Private - jwt required for access
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'TODO: Get user profile' });
});

// @desc   Update user profile
// route   PUT /api/users/profile
// access  Private - jwt required for access
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'TODO: Update user profile' });
});

// @desc   Logout user
// route   POST /api/users/logout
// access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'TODO: Logout user' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};