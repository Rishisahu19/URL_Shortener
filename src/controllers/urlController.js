const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const BASE_URL = process.env.BASE_URL;



// POST /shorten
const createShortUrl = async (req, res) => {
    const { url, expiryDate } = req.body;
    if (!validUrl.isUri(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }



    let finalExpiryDate;
    if (expiryDate) {
        finalExpiryDate = new Date(expiryDate);
    } else {
        finalExpiryDate = new Date();
        finalExpiryDate.setDate(finalExpiryDate.getDate() + 10);
    }


    try {
        const existing = await Url.findOne({ originalUrl: url });
        if (existing) {
            return res.json({ shortUrl: `${BASE_URL}/${existing.shortCode}` });
        }

        const shortCode = nanoid(6);
        const newUrl = await Url.create({ originalUrl: url, shortCode, expiryDate: finalExpiryDate });
        console.log(newUrl);
        res.status(201).json({ shortUrl: `${BASE_URL}/${shortCode}` });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /:code
const redirectToOriginalUrl = async (req, res) => {
    try {
        const entry = await Url.findOne({ shortCode: req.params.code });

        if (!entry) return res.status(404).json({ error: 'Short URL not found' });

        // Expiry check
        if (entry.expiryDate && new Date() > entry.expiryDate) {
            return res.status(410).json({ error: 'This short URL has expired' });
        }

        entry.clicks += 1;
        await entry.save();

        return res.redirect(entry.originalUrl);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createShortUrl, redirectToOriginalUrl };
