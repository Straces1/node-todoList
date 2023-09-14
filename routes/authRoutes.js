const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/signup', authController.render_signup)
router.get('/login', authController.render_login)
router.post('/signup', authController.signup_user)
router.post('/login', authController.login_user)
router.get('/logout', authController.logout_user)


module.exports = router;