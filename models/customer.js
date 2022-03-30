const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customerschema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },

    // confirmpassword:{
    //     type: String,
    //     required: true
    // }
})


const customer = mongoose.model('Customer', Customerschema);
module.exports = customer;