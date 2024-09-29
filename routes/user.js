const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savaRedirectUrl } = require("../middleWare.js");


const userController = require("../controller/user.js");
// signUp form 
router.route("/signup")
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.signUp));

router.route("/login")
    .get(userController.renderLogIn)
    .post(  
        savaRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.logIn
    );


// logout user 
router.get("/logout", userController.logOut);



module.exports = router; 