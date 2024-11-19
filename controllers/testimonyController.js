const testimonials = require('../models/testimonyModel')

//add testimonials
exports.addTestimonyController = async (req, res) => {
    console.log("Inside addTestimonyController");
    const { name, email, message } = req.body
    try {
        const newMessage = new testimonials({
            name, email, message
        })
        await newMessage.save()
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(401).json(error)
    }
}