import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import User, { IUser } from './models/UserModel';


const app = express();
app.use(cors());
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gamr8').then(() => {
    console.log('Connected to MongoDB');

    app.get('/api/users', async (req, res) => {
        try {
            const users: IUser[] = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
    app.post('/api/users', async (req, res) => {
        try {
            const newUser: IUser = new User(req.body);
            await newUser.save();
            res.json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});