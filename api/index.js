import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter  from './routes/user.router.js';

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connect to MongoDB');
})
.catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRouter);
// app.use('/api/user', userRouter); => The code snippet, the router is mounted under the '/api/user' path, meaning that all rouutes defined on router the 'router' will be retrive to '/api/user'.
