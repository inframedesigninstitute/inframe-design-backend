const { cityModel } = require("../../models/CityModel")
const { enquiryModel } = require("../../models/EnquiryModel")
const { stateModel } = require("../../models/StateModel")

const enquiryStateAdd = async (req, res) => {
    const { stateName } = req.body
    const stateData = await stateModel.findOne({ stateName })
    try {
        if (!stateData) {
            const state = new stateModel({ stateName })
            const stateRes = await state.save()
            res.send({
                status: 1,
                msg: 'State Name Created',
                stateRes
            })
        }
        else {
            res.send({
                status: 2,
                msg: 'State Name is already exist'
            })
        }
    }
    catch (error) {
        res.send({
            status: 0,
            msg: 'Something went wrong !',
            error
        })
    }
}

const enquiryStateView = async (req, res) => {
    const enquiryStateData = await stateModel.find()
    res.send({
        status: 1,
        msg: 'enquiry state data',
        enquiryStateData
    })
}


const enquiryCityAdd = async (req, res) => {
    const { cityName, stateName } = req.body
    const city = new cityModel({ cityName, state: stateName })
    const cityRes = await city.save()
    res.send({
        status: 1,
        msg: 'add enquiry city api',
        cityRes
    })
}

const enquiryCityView = async (req, res) => {
    const cityRes = await cityModel.find().populate('state')
    res.send({
        status: 1,
        msg: 'city data',
        cityRes
    })
}

const enquiryEntriesView = async (req, res) => {
    const enquiryData = await enquiryModel.find()
    res.send({
        status: 1,
        msg: 'enquiry entries',
        enquiryData
    })
}



module.exports = { enquiryStateAdd, enquiryStateView, enquiryCityAdd, enquiryCityView, enquiryEntriesView }