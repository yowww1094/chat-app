import express from 'express';

import {registerUser, loginUser, setAvatar} from '../controllers/usersController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/setAvatar', setAvatar);

export default router;