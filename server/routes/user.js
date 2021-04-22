import express from 'express';
import { signin, signup, getUser, followUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/:id', getUser);
router.patch('/:id/:idFollow/followUser', followUser);

export default router;