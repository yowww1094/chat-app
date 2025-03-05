import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import mongodbConnect from './config/mongodbConnect.js';

import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/authRoutes.js';

const PORT = process.env.PORT || 3033;

const app = express();

app.get('/', (req, res)=>{
    res.json({message: "Hello World"})
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

mongodbConnect;

app.listen(PORT, ()=> console.log(`Server connected on PORT ${PORT}`));