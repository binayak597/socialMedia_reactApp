import User from "../models/User.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

/** REGISTER */

export const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

/** LOGIN */

export const loginUser = async (req, res) => {
    try {
        const { email } = req.body;

        const options = {
            expiresIn: "24h"
        };

        const user = await User.findOne({ email });
        const token = jwt.sign({
            firstName: user.firstName,
            userId: user._id
        }, process.env.JWT_SECRET, options);

        delete user.password;
        return res.status(200).json({ token, user });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


/** 
 * "firstName": "fake",
  "lastName": "people",
  "email": "test12@gmail.com",
  "password": "test",
  "picturePath": "",
  "friends": "",
  "location":"somewhere",
  "occupation": "something",
  "viewedProfile":"",
  "impressions":""
 */