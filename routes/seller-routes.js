const express = require('express');
const {addSeller,
      loginSeller
} = require('../controllers/sellerController');

const router = express.Router();

router.post('/seller', addSeller);
router.post('/loginSeller', loginSeller);

module.exports = {
    routes: router
}