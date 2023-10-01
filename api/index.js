import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter  from './routes/user.router.js';
import authRouter from './routes/auth.router.js';

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connect to MongoDB');
})
.catch((err)=>{
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});

app.use('/api/user', userRouter);
// app.use('/api/user', userRouter); => The code snippet, the router is mounted under the '/api/user' path, meaning that all rouutes defined on router the 'router' will be retrive to '/api/user'.
app.use('/api/auth', authRouter);

// Initilizing middleware : The middleware function is design to catch error that occur during the execution of our application and send an appropriate JSON response with and error message and status code.
app.use((err, req, res, next) =>{  
    // next -> A callback function that passes control the next middleware in the chain or to an error-handling middleware if called with an argument(typically an error).

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success : false,
        message,
        statusCode // HTTP status code associated with the error
    });
});