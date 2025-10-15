const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: { type: String, required: true },
    userphone: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true }

})

exports.userModel = mongoose.model('user', UserSchema)