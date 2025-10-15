const { default: mongoose } = require("mongoose");

const StateSchema = mongoose.Schema({
    stateName: String
})

const stateModel = mongoose.model('state', StateSchema)


module.exports = { stateModel }

