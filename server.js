require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment')

const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')


const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware')

// express app
const app = express()

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
})

app.set('view engine', 'ejs')

// databese connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err))


app.get('*', checkUser)    
app.use(todoRoutes)
app.use(authRoutes)
app.use('/dashboard', adminRoutes)

app.use((req, res) => {
    res.status(404).render('404')
})



