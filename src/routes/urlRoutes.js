
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
    createShortUrl,
    redirectToOriginalUrl
} = require('../controllers/urlController');

const Limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: 'Too many shorten requests. Try again in 1 minute.'
});

router.post('/shorten', Limiter, createShortUrl);
router.get('/:code', redirectToOriginalUrl);

module.exports = router;
