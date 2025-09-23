const { cityModel } = require("../../models/CityModel");
const { enquiryModel } = require("../../models/EnquiryModel");
const { stateModel } = require("../../models/StateModel")

const enquiryAdd = async (req, res) => {
    try {
        const {
            enquiryName,
            enquiryEmail,
            enquiryPhone,
            enquiryState,
            enquiryCity,
            enquiryProgram,
            enquiryCourse,
            enquiryIsMarked
        } = req.body


        const stateData = await stateModel.findById(enquiryState)
        const dataObj = {
            enquiryName,
            enquiryEmail,
            enquiryPhone,
            enquiryState: stateData.stateName,
            enquiryCity,
            enquiryProgram,
            enquiryCourse,
            enquiryIsMarked: false
        }


        const enquiry = new enquiryModel(dataObj)
        const enquiryRes = await enquiry.save()
        res.send({
            status: 1,
            msg: 'enquiry completed',
            enquiryRes
        })
    }
    catch (error) {
        res.send({
            status: 0,
            msg: 'something went wrong',
            error
        })
    }



}


const enquiryCityView = async (req, res) => {
    const cityRes = await cityModel.find().populate('state')
    res.send({
        status: 1,
        msg: 'city data',
        cityRes
    })
}


module.exports = { enquiryAdd, enquiryCityView }