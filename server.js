require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const ToDo = require('./models/todo')
const todoRoutes = require('./routes/todoRoutes')

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


    app.use(todoRoutes)




// app.patch('/todos/:id', (req, res) => {
//     const id = req.params.id;
//     ToDo.findByIdAndUpdate(id, { checked: true })
//         .then(result => {
//             // res.status(201).json(result)
//             console.log(`Todo ${id} updated`)
//             res.status(201).json({ redirect: '/' })
//         })
//         .catch(err => console.log(err));
// })