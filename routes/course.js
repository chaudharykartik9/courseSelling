    const {Router} = require('express') ;
    const courseRouter = Router() ;





courseRouter.post('/purchase', (req, res)=>{
    res.json({ message: "User signed up" });

});


courseRouter.get('/preview', (req, res)=>{
     res.json({ message: "User signed up" });

});


module.exports ={
    courseRouter : courseRouter 
}