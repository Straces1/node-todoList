const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter user name'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
}, {timestamps: true})

// bcrypt methos for hashing password before saving to the db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

// login method
userSchema.statics.login = async function(name, password) {
    const user = await this.findOne({ name });

    if(user){
        const authenticate = await bcrypt.compare(password, user.password)
        if(authenticate) {
            return user
        } throw Error('Incorrect password')
    } throw Error('Incorrect username')
}


const User = mongoose.model('user', userSchema)

module.exports = User;