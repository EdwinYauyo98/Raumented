const express = require('express');
const {addProduct,
       editProduct,
       deleteProduct,
       getProducts 
} = require('../controllers/productController');


const router = express.Router();

router.post('/addProduct/:idSeller', addProduct);
router.put('/editProduct/:idSeller/:idProduct', editProduct);
router.delete('/deleteProduct/:idSeller/:idProduct', deleteProduct);
router.get('/getProducts/:idSeller', getProducts);

module.exports = {
    routes: router
}