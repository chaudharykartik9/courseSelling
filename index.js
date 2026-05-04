const express = require('express') ;
const { userRouter } = require('./routes/user') ;
const {courseRouter} = require('./routes/course');
const{adminRouter} = require('./routes/admin') ;


const port = 3000 ;
const app = express() ;
app.use(express.json());


app.use('/users', userRouter);
app.use('/courses',courseRouter);
app.use('/admin',adminRouter);


app.listen(port, () =>{
    console.log(`server is runnig at http://localhost:${port}`);
    
})
