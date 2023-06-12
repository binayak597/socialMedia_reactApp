import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import { users, posts } from "../data/index.js";

mongoose.set("strictQuery", true);

const connection = async () => {
    await mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    /** ADD DATA ONLY ONE TIME */
    // await User.insertMany(users);
    // await Post.insertMany(posts);

    console.log("DB is connected");
}

export default connection;