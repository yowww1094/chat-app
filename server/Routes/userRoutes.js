import express from 'express';

import { getAllUsers } from '../controllers/usersController.js';

const route = express.Router();

route.get('/getAllUsers/:id', getAllUsers);

export default route;