import User from "../models/User.js";
import Post from "../models/Post.js";


export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = await Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });
        const posts = await Post.find();
        return res.status(201).json(posts);
    } catch (error) {
        return res.status(409).json({error: error.message});
    }
}

export const getFeedPost = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Post.find({ userId });
        return res.status(200).json(userPosts);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id,
            {likes: post.likes},
            {new: true}
            );
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}