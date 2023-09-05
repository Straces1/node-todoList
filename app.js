require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./models/todo')

// express app
const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

// databese connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err))


app.get('/', (req, res) => {
  res.redirect('/todos')
})

app.get('/todos', (req, res) => {
    ToDo.find().sort({ createdAt: 1 })
        .then((result) => {
            res.render('index', {todos: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

app.post('/todos', (req, res) => {
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
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    ToDo.findByIdAndDelete(id)
        .then(result => {
            //res.status(201).json(result)
            console.log(`Todo ${id} deleted`)
            res.status(201).json({ redirect: '/todos' })
        })
        .catch(err => console.log(err));
})


app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    ToDo.findByIdAndUpdate(id, { checked: true })
        .then(result => {
            // res.status(201).json(result)
            console.log(`Todo ${id} updated`)
            res.status(201).json({ redirect: '/' })
        })
        .catch(err => console.log(err));
})