import User from "../models/user";
import {hashPassword, comparePassword} from "../helpers/auth";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
    // console.log("Data coming", req.body);
    const {name, email, password, security} = req.body;
    if (!name) {
        return res.json({
            error: "Name is required"
        })
    }
    if (!email) {
        return res.json({
            error: "Email is required"
        })
    }
    if ( !password || password.length < 6 ) {
        return res.json({
            error: "Password is required and should be 6 characters long"
        })
    }
    if (!security) {
        return res.json({
            error: "Security is required"
        })
    }
    const exist = await User.findOne({email});
    if (exist) {
        return res.json({
            error: "Email already taken"
        })
    }
    const hashedPassword = await hashPassword(password);
    const user = new User({name, email, password: hashedPassword, security});
    try {
        await user.save();
        return res.json({
            ok: true
        })
    } catch (err){
        return res.status(400).send("Error. Try Again");
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "User not found"
            })
        }
        const psw = await comparePassword(password, user.password);
        if(!psw) {
            return res.json({
                error: "Password does not match"
            })
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        user.security = undefined;
        res.json({
            token,
            user
        });
    } catch (err) {
        return res.status(400).send("Error. Try Again");
    }
}
export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            ok: true
        });
    } catch (error) {
        // console.log(error);
        res.sendStatus(400);
    }
}
export const forgotPassword = async (req, res) => {
    const {email, newPassword, security} = req.body;
    if (!newPassword || newPassword < 6) {
        return res.json({
            error: "New Password is required and should be atleast 6 characters long"
        })
    }
    if (!security) {
        return res.json({
            error: "Security Question is required"
        })
    }
    const user = await User.findOne({email, security});
    if (!user) {
        return res.json({
            error: "User could not be verified"
        })
    }
    try {
        const hashed = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {password: hashed});
        return res.json({
            success: "Password Updated Successfully. You can login Now"
        })
    } catch (error) {
        console.log(error);
        return res.json({
            error: "Something went wrong try again!!!"
        })
    }
}