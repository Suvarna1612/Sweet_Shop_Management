const users = [];

const register = (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const emailFormat = /^\S+@\S+\.\S+$/;
  if (!emailFormat.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  const emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  if (name) {
    const nameExists = users.find(u => u.name === name);
    if (nameExists) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }
  }

  users.push({ email, password, name });

  return res.status(201).json({
    success: true,
    token: "token",
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const user = users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    success: true,
    token: "token",
  });
};

module.exports = {
  register,
  login,
  users 
};