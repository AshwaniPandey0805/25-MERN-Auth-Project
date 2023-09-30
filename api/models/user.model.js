import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    passowrd : {
        type : String,
        required : true,
        
    }
    
}, {timestamps : true}); 
// The 'timestamps' option is handly for tracking when data was created last modified       without manually managing these fields in our application code.
// It can be particularly used for auditing, versioing, and debugging purpose.
// We can also use these timestamps for various queries, such as finding document created or updated withi a specific time range.

const User  = mongoose.model('User', userSchema);
// 'mongoose.model' : This method is used to create a new Mongoose model. It takes two argument: 

// 1) 'User' -> The first argument is the singular name of the model(int this ccase, "User"). Mongoose will automatically pluralize the name to create a collection in MongoDB,so it will be stored as 'users' in the database. 

// 2) 'userSchema' -> The second argument is the schema that defines the structure of documants in the "User" collection. This schema defines the field, type, and validation rules for document in the collections.

export default User; // through this we can use it anywhere in the application

