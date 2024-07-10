const express = require('express');
const router = express.Router();

const { getSignup, getlogin, postSignup, postLogin, dashBoard, userAuth } = require('../Controller/authController');

const AuthJwt = require('../middleWare/isAuth');

router.get('/signup',getSignup);
router.get('/login',getlogin);

router.post('/postSignup',postSignup);
router.post("/postLogin",postLogin);

router.get("/Dashboard",AuthJwt.authJwt,userAuth,dashBoard);




module.exports = router;