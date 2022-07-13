import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { JobSource } from './models/JobSource.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const user = {
    id: 1,
    username: 'hans',
    firstName: 'Hans',
    lastName: 'Richter'
};

dotenv.config();

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost/ejt-job-manager';

mongoose.connect(MONGODB_URI, (err) => {
    if (err) {
        console.log({
            error: 'Cannot connect to MongoDB database.',
            err: `"${err}"`
        });
    }
});

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3044;

app.get('/', (req, res) => {
    res.send('<h1>Job-Manager API</h1>');
});

app.get('/job-sources', async (req, res) => {
    const jobSources = await JobSource.find();
    res.status(200).json(jobSources);
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'hans' && password === '123') {
        jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({
				user,
				token
            });
        });
    } else {
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
