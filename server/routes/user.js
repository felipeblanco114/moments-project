import express from 'express';
import { signin, signup, getUser, followUser, getFollows } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', getUser);
router.get('/:id/getFollows', getFollows);
router.patch('/:id/followUser', auth, followUser);

export default router;