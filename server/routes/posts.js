import express from 'express';

import { getPosts, createPosts, updatePost, deletePost, likePost, filterPosts } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// localhost:5000/posts

router.get('/', getPosts);
router.get('/search', filterPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;