const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const urlRoutes = require('./routes/urlRoutes');
const Url = require('./models/Url');


connectDB();

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    try {
        res.status(200).json({ message: '✅ URL Shortener API is live'});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/fetch', async (req, res) => {
    try {
        const all = await Url.find();
        res.json(all);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
