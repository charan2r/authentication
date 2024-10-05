const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'], 
    credentials: true, 
}));

mongoose.connect(process.env.MONGO_URI, {

}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

const authRoutes = require('./routes/route');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});