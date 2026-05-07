const {Router} = require("express") ;
const adminRouter = Router() ;
const {Admin, Course} = require("../db") ;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require('./middlewares/authadmin')

//adminRouter.use(adminMiddleware) ;

adminRouter.post('/signup', async(req, res)=>{
      const { email, password, firstname, lastname } = req.body;
      try {
        const existingAdmin = await Admin.findOne({
          email: email,
        });
    
        if (existingAdmin) {
          res.status(403).json({
            message: "Admin with this Adminname already exists",
          });
          return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({
          email: email,
          password: hashedPassword,
          firstname: firstname,
          lastname: lastname,
        });
        res.json({
          id: newAdmin._id,
        });
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
     
});


adminRouter.post('/signin', async(req, res)=>{
const { email, password, firstname, lastname } = req.body;

  try {
    const adminExist = await Admin.findOne({
      email: email,
    });

    if (!adminExist) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, adminExist.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: adminExist._id, email: adminExist.email },
      process.env.JWT_SECRET_admin, // move to .env later
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
      id: adminExist._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }

});


adminRouter.post('/createcourse' , authMiddleware, async(req, res)=>{
     const adminid = req.adminId ;
     const {title,description,price,imageUrl} = req.body ;
     const course = await Course.create({
          title,
          description,
          price,
          imageUrl,
          creatorId : adminid 
     });

     res.json({
          message : "course created" ,
          courseId : course._id 
          
     })


});

adminRouter.put('/createcourse', (req, res)=>{
     res.json({ message: "Admin signed up" });

});

adminRouter.get('/courses', (req, res)=>{f 
     res.json({ message: "Admin signed up" });

});

module.exports = {
    adminRouter : adminRouter } ;