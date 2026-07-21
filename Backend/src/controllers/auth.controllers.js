const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User Already Exists with email or username",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User Register Successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Both Are Required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invaild Email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invaild Password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);
    

    return res.status(201).json({
      message: "User login Successfully",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function logoutUser(req, res) {
  try {
    const token = req.cookies.token;
    if (token) {
      await tokenBlacklistModel.create({ token });
    }
    res.clearCookie("token");

    return res.status(200).json({
      message: "User Logout Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getmeUser(req, res) {
  try {
    const user = await userModel.findById(req.user.id);

    return res.status(200).json({
      message: "User Detail Fetched Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getmeUser,
};
