const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//add user or register
exports.registerController = async (req, res) => {
    console.log("inside registerController");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Already a user! Please Login")
        }
        else {
            const encryptedPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptedPassword, profilePic: ""
            })
            await newUser.save()
            res.status(200).json(newUser)

        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            let isMatch = await bcrypt.compare(password, existingUser.password)
            if (existingUser.password == password || isMatch) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(404).json("Invalid Password")
            }
        } else {
            res.status(404).json("Invalid Email")
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

    
    
    
        
            