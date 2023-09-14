const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()
const { authAdmin } = require('../middleware/authMiddleware')

router.get('/', authAdmin, adminController.get_admins_page)
router.delete('/:id', adminController.delete_user) 
router.get('/:id', adminController.user_details)

module.exports = router