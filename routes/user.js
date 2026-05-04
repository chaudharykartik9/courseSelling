const { Router } = require('express');
const userRouter = Router();

userRouter.post('/signup', (req, res)=>{
     res.json({ message: "User signed up" });
    
});

userRouter.post('/signin', (req, res)=>{
     res.json({ message: "User signed up" });

});

userRouter.get('/purchases', (req, res)=>{
     res.json({ message: "User signed up" });
});



module.exports ={
    userRouter : userRouter 
}