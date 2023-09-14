const jwt = require('jsonwebtoken')
const User = require('../models/auth')


// getting ID attempt
const addId = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if(err) {
                next()
            } else {
                req.body = {...req.body, user_id: decodedToken.id}
                next()
            }
        })
    } else {
        next()
    }
}
// this piece of middleware checks if the user is loged in, 
// if there is a user it will pass the user object into user 
// variable available inside views
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if(err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }

};

// middleware to protect certain routes from nonauthenticated users
const authAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                // res.redirect('/login')
            } else {
                let user = await User.findById(decodedToken.id)
                if(user.name === 'admin') {
                    next();
                } else {
                    console.log('you are not the admin')
                    // res.redirect('/login')
                }
                
            }
        })
    } else {
        console.log('no admin')
        // res.redirect('/login')
    }
}

    module.exports = {
        checkUser, authAdmin, addId
    };