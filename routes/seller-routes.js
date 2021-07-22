const express = require('express');
const {addSeller,
      loginSeller,
      editSeller,
      getSeller,
      getSellers
} = require('../controllers/sellerController');

const router = express.Router();

router.post('/addseller', addSeller);
router.post('/loginSeller', loginSeller);
router.put('/editSeller/:idSeller', editSeller);
router.get('/getSeller/:idSeller', getSeller);
router.get('/getSellers', getSellers);

module.exports = {
    routes: router
}