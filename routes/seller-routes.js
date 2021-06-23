const express = require('express');
const {addSeller,
      loginSeller,
      editSeller
} = require('../controllers/sellerController');

const router = express.Router();

router.post('/addseller', addSeller);
router.post('/loginSeller', loginSeller);
router.put('/editSeller/:idSeller', editSeller);

module.exports = {
    routes: router
}