const express = require('express');
const {uploadPhoto,
       getPhotos,
       editPhoto
} = require('../controllers/photoController');

const router = express.Router();

router.post('/uploadPhoto/:idSeller/:idProduct', uploadPhoto);
router.get('/getPhotos/:idSeller', getPhotos);
router.put('/editPhoto/:idSeller/:idProduct', editPhoto);

module.exports = {
    routes: router
}