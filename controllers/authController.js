const User = require('../models/auth')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { name: '', password: '' }

    // duplicate error
    if(err.code ===11000) {
        errors.name = 'Username already registered'
    }
    // incorrect username
    if(err.message === 'Incorrect username'){
        errors.name = 'This username is not registered'
    }
    // incorrect password
    if(err.message === 'Incorrect password'){
        errors.password = 'This password is not correct'
    }
    return errors;
}

// create web token
maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    });
};

const render_signup = (req, res) => {
    res.render('signup')
}
const render_login = (req, res) => {
    res.render('login')
}

const signup_user = async (req, res) => {
    const { name, password} = req.body;

    try {
        const user = await User.create({name, password})

        //auth
        const token = createToken(user._id)
        console.log(token)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

        res.status(201).json({user: user._id})
    }
    catch (err){
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

const login_user = async (req, res) => {
    const { name, password } = req.body

    try {
        const user = await User.login(name, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, magAge: maxAge * 1000})
        res.status(200).json({ user: user._id })
        console.log(`logged as ${user.name}`)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({ errors })
    }
}

const logout_user = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}


module.exports = {
    signup_user, render_signup, render_login, login_user, logout_user
}