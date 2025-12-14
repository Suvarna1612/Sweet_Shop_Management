const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const hashPassword = async (password) => {
  throw new Error("Not implemented");
};

const comparePassword = async (password, hashedPassword) => {
  throw new Error("Not implemented");
};

const generateToken = (payload) => {
  throw new Error("Not implemented");
};

const verifyToken = (token) => {
  throw new Error("Not implemented");
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken
};

