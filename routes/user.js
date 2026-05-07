const { Router } = require("express");
const userRouter = Router();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const authMiddleware = require('./middlewares/authmiddleware') ;

const saltRounds = 10; // higher = more secure but slower

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      res.status(403).json({
        message: "User with this username already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    });
    res.json({
      id: newUser._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const userexsit = await User.findOne({
      email: email,
    });

    if (!userexsit) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, userexsit.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_user, // move to .env later
      { expiresIn: "1h" },
    );

    // 🍪 Send token in httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
    });

    res.json({
      message: "Signin successful",
      id: userexsit._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

userRouter.get("/purchases", authMiddleware , async(req, res) => {
  const user = await User.findById(req.userId);
  
});

module.exports = {
  userRouter: userRouter,
};
