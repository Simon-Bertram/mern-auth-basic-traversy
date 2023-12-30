import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc  Authenticate user & get token
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
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
  try {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };

    if (!user._id || !user.name || !user.email) {
      res.status(404);
      throw new Error('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);

    // Send a generic error response to the client
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// @desc   Update user profile
// route   PUT /api/users/profile
// access  Private - jwt required for access
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user object with new values
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If password is being updated, hash the new password
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user object to the database
    const updatedUser = await user.save();

    // Generate a new token with the updated user object
    generateToken(res, updatedUser._id);

    // Return the updated user object to the client
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc   Logout user
// route   POST /api/users/logout
// access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};