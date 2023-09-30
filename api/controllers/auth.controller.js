import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) =>{
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
        res.status(500).json(error.message); // status(500) -> Internal Server Error.
    }
    

};

