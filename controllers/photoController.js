'use strict';

const firebase = require('firebase');
const Photo = require('../models/photo');
const firestore = firebase.firestore();

const uploadPhoto = async (req, res, next) =>{
    try {
        const idSeller = req.params.idSeller;
        const idProduct = req.params.idProduct;
        const data = req.body;
        await firestore.collection('ProductGallery').doc(idSeller).collection('Products').doc(idProduct).set(data);
        res.send("Fotos agregadas satisfactoriamente");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPhotos = async (req, res, next) => {
    try {
        const idSeller = req.params.idSeller;
        const galleryRef = firestore.collection('ProductGallery').doc(idSeller).collection('Products');
        const data = await galleryRef.get();
        const galleryArray = [];
        const idGalleryArray = [];
        if (data.empty) {
            res.status(404).send("No hay fotos para este seller");
        } 
        else {
            data.forEach(element => {
                const photo = new Photo(
                    element.data().url1,
                    element.data().url2,
                    element.data().url3
                );
                idGalleryArray.push(element.id);
                galleryArray.push(photo);
            });
            res.json({idGalleryArray, galleryArray});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteGallery = async (req, res, next) => {
    try {
        const idSeller = req.params.idSeller;
        await firestore.collection('ProductGallery').doc(idSeller).delete();
        res.send('eliminado');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const editPhoto = async (req, res, next) => {
    try{
        const idSeller = req.params.idSeller;
        const idProduct = req.params.idProduct;
        const data = req.body;
        const product = await firestore.collection('ProductGallery').doc(idSeller).collection('Products').doc(idProduct);
        await product.update(data);
        res.send('Url de fotos actualizado satisfactorimente');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    uploadPhoto,
    getPhotos,
    editPhoto,
    deleteGallery
}