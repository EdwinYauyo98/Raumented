const express = require('express');
const {addEnterprise} = require('../controllers/enterpriseController');

const router = express.Router();

router.post('/enterprise', addEnterprise);


module.exports = {
    routes: router
}