import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js'

const router = express.Router();

export const getPosts = async (req, res) => {
    var origin = req.get('origin');
    try {
        if(req.query.search){
            const filterPosts = await PostMessage.find(
                {"title": req.query.search}
        );

        res.status(200).json(filterPosts);
    } else {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPosts = async (req, res) => {
    const { id } = req.params;
    try {
        const userPosts = await PostMessage.find({
            creator: id
        })
        res.status(200).json(userPosts)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No se encuentra ningún post con ese id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No se encuentra ningún post con ese id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post eliminado exitosamente.'});
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: 'No identificado.' })

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No se encuentra ningún post con ese id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        // like the post 
        post.likes.push(req.userId);
    } else {
        // dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId) )
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
}

export const filterPosts = async (req, res) => {
    const { search } = req.params;
    try {
        const posts = await PostMessage.find({ 
            $or: [
            { name: {$regex: search, $options: "i"} }, 
            { title: {$regex: search, $options: "i"}}, 
            { tags: {$regex: search, $options: "i"}},
            { email: {$regex: search, $options: "i"} },
            { message: {$regex: search, $options: "i"} }
        ]
        });
        res.json(posts);
    } catch (error) {
        console.log({ message: error })
    }
}

export const getLikePosts = async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await PostMessage.find({
            likes: id
        });
        res.json(posts);
    } catch (error) {
        console.log({ message: error })
    }
}

export default router;