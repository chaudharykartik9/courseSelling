const express = require('express') ;
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken") ;
require('dotenv').config();
//const dbUrl = process.env.DB_URL;

//console.log(dbUrl);

const { userRouter } = require('./routes/user') ;
const {courseRouter} = require('./routes/course');
const{adminRouter} = require('./routes/admin') ;
const cookieParser = require("cookie-parser");
const app = express() ;
app.use(cookieParser());


const port = 3000 ;
app.use(express.json());


app.use('/users', userRouter);
app.use('/courses',courseRouter);
app.use('/admin',adminRouter);
//const dbUrl = process.env.DB_URL;

console.log("connected to db ");
 async function main(){
   await mongoose.connect(process.env.DB_URL) ;
   app.listen(port, () =>{
       console.log(`server is runnig at http://localhost:${port}`);
       
   })
}
main() ;

