const express = require('express');
const {uploadPhoto,
       getPhotos,
       editPhoto,
       deleteGallery
} = require('../controllers/photoController');

const router = express.Router();

router.post('/uploadPhoto/:idSeller/:idProduct', uploadPhoto);
router.get('/getPhotos/:idSeller', getPhotos);
router.put('/editPhoto/:idSeller/:idProduct', editPhoto);
router.delete('/delete/:idSeller', deleteGallery);

module.exports = {
    routes: router
}