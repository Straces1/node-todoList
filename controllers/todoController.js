const ToDo = require('../models/todo')

const todo_index = (req, res) => {
    res.redirect('/todos')
}

const get_todos = (req, res) => {
    ToDo.find().sort({ createdAt: 1 })
        .then((result) => {
            res.render('index', {todos: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

const post_todo = (req, res) => {
    const todo = new ToDo(req.body)
    todo.save()
        .then(result => {
            console.log('todo saved')
            res.redirect('/') 
        })
        .catch((err) => {
            console.log(err)
            res.json(err.message)
        })
}

const delete_todo = (req, res) => {
    const id = req.params.id;
    ToDo.findByIdAndDelete(id)
        .then(result => {
            //res.status(201).json(result)
            console.log(`Todo ${id} deleted`)
            res.status(201).json({ redirect: '/todos' })
        })
        .catch(err => console.log(err));
}

const update_todo = (req, res) => {
    const id = req.params.id;
    ToDo.findByIdAndUpdate(id, { checked: true })
        .then(result => {
            // res.status(201).json(result)
            console.log(`Todo ${id} updated`)
            res.status(201).json({ redirect: '/' })
        })
        .catch(err => console.log(err));
}

module.exports = {
    todo_index, get_todos, post_todo, delete_todo, update_todo
}