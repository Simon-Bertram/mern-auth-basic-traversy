import asyncHandler from 'express-async-handler';

// @desc  Authenticate user & get token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'TODO: Auth user & get token' });
});

// @desc   Register a new user
// route   POST /api/users/register
// access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'TODO: Register user' });
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