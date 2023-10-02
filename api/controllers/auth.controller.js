import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';  
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) =>{
    const {username ,email, password} = req.body;
    // "req.body" -> In Express.js req.body is a property of thr HTTP request object ('req') that contains the data sent as the the request body. It is used to access data submitted on HTTP POST reauest when submitting forms or API request with the request body in JSON format.

    // "{ username, email, password }" : This is destructuring syntax in JavaScript. It allows you to extract specific properties from an object and assign them to variable with mattching names. 
    const userPassword = bcryptjs.hashSync(password, 10); // ( 10 -12 ) recommeneded value
    // 'bcryptjs' : This is a popular library used for securely hashing password. It provide functions for both synchronous and asynchronous password hashing comparison.
    // hashSync -> function of bcrypt to hash a password synchronosly.
    // (password, 10) -> password : it is plane text password that we want to hash. 
    //                ->       10 : This the number of rounds of hashing to apply.
    //                              The high the number, the more secure the hash, but 
    //                              increse the time taken to hash the password.    

    const newUser = new User({username, email, password : userPassword});
    // A new user document is created using the "User" model, and initilized with the extracted 'username', 'email', 'password'.
    

    try {
        await newUser.save();
        // snippet attempts to save the newly created user document to the database using 
        res.status(201).json({ //  status(200) -> Created.
            message : 'User created successfully',
        });
        
    } catch (error) {
        next(error); 
    }
    

};

export const signin =  async(req, res, next) =>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({ email });
        
        // 'await' : is a keyword, which suggests that this code is likely inside an 'async' function, as 'await' is used to wait for asynchronous operatio to complele.

        // 'findOne' : is a query to find a user document in the database. 
        
        if(!validUser) return next(errorHandle(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandle(401, 'Worng credentials' ));
        const token = jwt.sign({id : validUser._id }, process.env.JWT_SECRET);
        const { password : hashPassword, ...rest} = validUser._doc;
        
        // { password : hashedPassword, ...rest } -> is an object destructuring pattern that extract properties from 'validUser._doc' and assigns them to a variable. 
        // (...rest) -> The spread operator collects all the other properties from 'validUser._doc' into an object called rest.
        // This code is offten in scenarios where we want to retrive a user from the database and then extract specific properties from the user document for further use.In this case we are extracting the password (possible for authentication purpose)  and collecting the remaining user data into the 'rest' object.
        
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour
        res
        .cookie('access_cookie', token, { httpOnly : true, expires : expiryDate })

        // .cookie() : is a method used to set cookies in the response.
        // 'access_cookie' : is the name of the cookie. This is the identifier by which the cookie will ne stored on the client browser.
        // { httpOnly : true } : is an options onject that configure the cookie. Setting 'httpOnly' to 'true' means that the cookie can only be accessed via HTTP request or modified by client-side JavaScript. This is a security measure to protect sensitive data, like authentication token, from potential cross-site scripting(XSS) attack.
        .status(200)
        .json(rest);

    } catch (error) {
        next(error);
        
    }

};

