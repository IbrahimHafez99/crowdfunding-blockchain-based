import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isConsultant: user.isConsultant,
          token: generateToken(user._id)
        }
      }
    });
  } else {
    res.status(401);
    res.json({ status: 'error', message: 'Invalid email or password' });
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    res.json({ status: 'error', message: 'User already exists' });
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isConsultant: user.isConsultant,
          token: generateToken(user._id)
        }
      }
    });
  } else {
    res.status(400);
    res.json({
      status: 'error',
      message: 'Invalid user data'
    });
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      status: 'success',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isConsultant: user.isConsultant
        }
      }
    });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'User not found' });
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'User already exists with that email'
      });
      throw new Error('User already exists with that email');
    }

    const updatedUser = await user.save();

    res.json({
      status: 'success',
      data: {
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isConsultant: updatedUser.isConsultant,
          token: generateToken(updatedUser._id)
        }
      }
    });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'User not found' });
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ status: 'success', data: { users } });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      res.json({ status: 'success', data: { user } });
    } else {
      res.status(404);
      res.json({ status: 'error', message: 'User not found' });
      throw new Error('User not found');
    }
  } catch (err) {
    res.status(400);
    res.json({ status: 'error', message: err.message });
    throw new Error(err.message);
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isConsultant = req.body.isConsultant;

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400);
      res.json({
        status: 'error',
        message: 'User already exists with that email'
      });
      throw new Error('User already exists with that email');
    }

    const updatedUser = await user.save();

    res.json({
      status: 'success',
      data: {
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          isConsultant: updatedUser.isConsultant
        }
      }
    });
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'User not found' });
    throw new Error('User not found');
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(204).json();
  } else {
    res.status(404);
    res.json({ status: 'error', message: 'User not found' });
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
