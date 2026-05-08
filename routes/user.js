const { Router } = require("express");
const userRouter = Router();

const { User, Course, Purchase } = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./middlewares/authuser");

const saltRounds = 10;


// =========================
// USER SIGNUP
// =========================
userRouter.post("/signup", async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(403).json({
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    res.json({
      message: "Signup successful",
      id: newUser._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// =========================
// USER SIGNIN
// =========================
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({
      email,
    });

    if (!userExist) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: userExist._id,
        email: userExist.email,
      },
      process.env.JWT_SECRET_user,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      message: "Signin successful",
      token,
      id: userExist._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// =========================
// PREVIEW ALL COURSES
// PUBLIC ROUTE
// =========================
userRouter.get("/preview", async (req, res) => {
  try {
    const courses = await Course.find({});

    res.json({
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// =========================
// PURCHASE COURSE
// =========================
userRouter.post("/purchase", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const { courseId } = req.body;

  try {
    // check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // prevent duplicate purchase
    const alreadyPurchased = await Purchase.findOne({
      userId,
      courseId,
    });

    if (alreadyPurchased) {
      return res.status(400).json({
        message: "Course already purchased",
      });
    }

    // create purchase
    await Purchase.create({
      userId,
      courseId,
    });

    res.json({
      message: "Course purchased successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


// =========================
// MY PURCHASED COURSES
// =========================
userRouter.get(
  "/purchases",
  authMiddleware,
  async (req, res) => {
    try {
      // find all purchases
      const purchases = await Purchase.find({
        userId: req.userId,
      });

      // extract course ids
      const courseIds = purchases.map(
        (purchase) => purchase.courseId
      );

      // get courses
      const coursesData = await Course.find({
        _id: {
          $in: courseIds,
        },
      });

      res.json({
        purchasedCourses: coursesData,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
);

module.exports = {
  userRouter,
};