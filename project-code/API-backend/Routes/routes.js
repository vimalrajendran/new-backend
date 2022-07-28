const express = require('express');
const router = express.Router();
const {getSearch} = require("../controllers/controllers");

router.get('/search', getSearch);

module.exports = router;