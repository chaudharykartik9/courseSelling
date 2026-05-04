const {Router} = require("express") ;
const adminRouter = Router() ;

//adminRouter.use(adminMiddleware) ;

adminRouter.post('/signup', (req, res)=>{
     res.json({ message: "User signed up" });
    
});
adminRouter.post('/signin', (req, res)=>{
     res.json({ message: "User signed up" });

});
adminRouter.post('/createcourse', (req, res)=>{
     res.json({ message: "User signed up" });

});

adminRouter.put('/createcourse', (req, res)=>{
     res.json({ message: "User signed up" });

});

adminRouter.get('/courses', (req, res)=>{
     res.json({ message: "User signed up" });

});

module.exports = {
    adminRouter : adminRouter } ;