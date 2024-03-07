// import packages
const express =require('express');
const mongoose =require('mongoose');
require('dotenv').config();


// import from other files
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

// init
const app = express();
const port = process.env.port || 3000;
const DB = process.env.DB;

// middleware
app.use(express.json())
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

console.log(process.env);

//connections
mongoose.connect(DB).then(()=>{
    console.log('Connection successful');
}).catch(err=>{
    console.log(err);
})





app.get('/hello-world', (req,res)=>res.json({name:'Chirag Rathore'}))

app.listen(port, "0.0.0.0", ()=>{
    console.log(`server started at ${port}`);
})

