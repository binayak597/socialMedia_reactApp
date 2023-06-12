import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/** AUTHENTICATION */

export const authentication = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if(!foundUser) return res.status(404).json({msg: "User is not exist"});
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        next();
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/** VALIDATION */

export const verifyUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const foundUser = await User.findOne({ email });
        if(foundUser) return res.status(200).json({msg: "User is already exist"});
        next();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

/** VERIFICATION OF TOKEN */

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token) return res.status(403).json({msg: "Access Denied"});
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}