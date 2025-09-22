const express = require('express');
// const { register, login } = require('../controllers/authController');
const {register, login, deleteUser} = require("../controllers/authController"); 
const { authenticateJWT } = require('../middleware/authMiddleware');
const authRouter = express.Router();


authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/:id", authenticateJWT, deleteUser);



module.exports = authRouter;



