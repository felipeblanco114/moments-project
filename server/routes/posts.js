import express from 'express';

import { getPost, getPosts, createPosts, updatePost, deletePost, likePost, getUserPosts, filterPosts, getLikePosts, getPostsFollow } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// localhost:5000/posts

router.get('/:id/details', getPost);
router.get('/', getPosts);
router.get('/:id', getUserPosts);
router.get('/search/:search', filterPosts);
router.get('/:id/likes', getLikePosts);
router.get('/:id/:ownId/postsFollow', getPostsFollow);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;