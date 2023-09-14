const ToDo = require('../models/todo')
const User = require('../models/auth')

const get_admins_page = async (req, res) => {
    // const user_id = req.body.user_id
    try {
        const users = await User.find().sort({createdAt: -1})
        const todos = await ToDo.find()
        //console.log(todos)
        res.render('admin', { users, todos })
        
    } catch (error) {
        console.log(error)
    }
}

const delete_user = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(result => {
            //res.status(201).json(result)
            console.log(`User ${id} deleted`)
            res.status(201).json({ redirect: '/dashboard' })
        }).catch(err => console.log(err))
}

const user_details = async (req, res) => {
    const id = req.params.id;
    try {
        const userDetail = await User.findById(id)
        const usersTodos = await ToDo.find({user_id: id})
        res.render('userDetails', {userDetail, usersTodos})
    } catch (error) {
        res.send("User doesn't exist")
    }
}

module.exports = {
    get_admins_page, delete_user, user_details
}