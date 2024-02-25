const userModel = require('../model/userModels')
const bcrypt = require("bcryptjs");

//Register callback function
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({email: req.body.email})
        if(exisitingUser){
            return res.status(200).send({message: 'User Already Registered', success: false})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password.salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(200).send({message: 'Registration Successfully Done!', success: true})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message:`Register Controller ${error.message}`})
    }
}

const loginController = () => {}

module.exports = {loginController, registerController};