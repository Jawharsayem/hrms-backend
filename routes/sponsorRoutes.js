// routes/sponsorRoutes.js

const express = require('express');
const router = express.Router();
const {addSponsor} = require('../controllers/sponsorController');
const { handleFetchSponsor } = require('../controllers/sponsorController');

router.post('/add-sponsor', addSponsor);
router.get('/', handleFetchSponsor);

module.exports = router;
