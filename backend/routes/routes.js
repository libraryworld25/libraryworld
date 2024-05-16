const express = require('express');
const multer = require("multer")
const routes = express.Router();

// importing the contrllers
const signup = require('../controllers/signup.js');
const login = require('../controllers/login.js');
const sendEmail = require('../controllers/sendEmail.js');
const autoLogin = require('../controllers/autoLogin.js')
const getUserInfo = require('../controllers/getUserInfo.js');
const updateUserInfo = require("../controllers/updateUserInfo.js")
const saveImage = require('../controllers/saveImage.js')

// importing the middlewares 
const authenticateToken = require("../middlewares/authenticateToken.js");
const updatePassword = require('../controllers/updatePassword.js');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    },
});
const upload = multer({ storage: storage });


routes
    .post('/signup', signup)
    .post('/login', login)
    .post('/send-email', sendEmail)
    .post('/auto-login', autoLogin)
    .post('/get-user-info', authenticateToken, getUserInfo)
    .post('/update-user-info', authenticateToken, updateUserInfo)
    .post('/save-image', authenticateToken, upload.single("image"), saveImage)
    .post('/update-password', updatePassword)


module.exports = routes;