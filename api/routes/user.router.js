import express from 'express';
import { test, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();
// 'router' -> router is nothing else a Express.js router object,
// In Express.js, router are used to define routes and organize the handling pf HTTP request and response.
// 'express.Router()' : express -> module , Router -> class to create a router instance
// Defining Router : We can define routes on this router by using HTTP methods like 'get', 'post', 'put', 'delete',

router.get('/', test);
router.post("/update/:id", verifyUser, updateUser); // update the user functionality
router.delete("/delete/:id", verifyUser, deleteUser);

// one routes is defined using the router for handle GET request

export default router;