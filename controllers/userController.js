const userModel = require("../model/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Register callback function
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({email: req.body.email})
        if(exisitingUser){
            return res.status(200).send({message: 'User Already Registered', success: false})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({message: 'Registration Successfully Done!', success: true})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message:`Register Controller ${error.message}`})
    }
}

//Register callback function
const loginController = async (req, res) => {
    try {
        //check the user id new or not regester yet
        const user = await userModel.findOne({email: req.body.email})
        if(!user) {
            return res.status(200).send({message: 'User not found', success: false})
        }
        //decripted the encripted passward, passward matching
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(200).send({message: "Invalid username or password",success: false})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        response.status(200).send({message: "Login Success",success: true, token})
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error in login: ${error.message}`})
    }
}

module.exports = {loginController, registerController};