//console.log("In user.js");
const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
var path = require('path');
//const process = require('process'); 

const User = require("../model/User");
//console.log("got all the data will call router.post");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        console.log(req.body);
        console.log(req.body.username);
        console.log(req.body.password);
        console.log(req.body.email);
        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            res.status(200).send("New User Created");
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);


router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        req.session.auth = {email: user.email};
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
        });
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.status(200).sendFile(path.join(__dirname,'../ui', 'index.html'));
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

  module.exports = router;