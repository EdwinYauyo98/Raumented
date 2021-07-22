'use strict';

const firebase = require('../db');
const Product = require('../models/product');
const firestore = firebase.firestore();
const {json} = require('body-parser');

const addProduct = async (req, res, next) =>{
    try{
        const idSeller = req.params.idSeller;
        const data = req.body;
        await firestore.collection('Market').doc(idSeller).collection('Products').doc().set(data);
        const productRef = firestore.collection('Market').doc(idSeller).collection('Products');
        const snapshot =  await productRef.where('Name', '==', data.Name).get();
        if(snapshot.empty){
            res.send('Producto no registrado');
        }
        else{
            snapshot.forEach(element => {
              res.json({"idProduct": element.id});
            });
        }
    }
    catch(error){
        res.status(400).send('error.message')
    }
}

const editProduct = async (req, res, next) => {
    try{
        const idSeller = req.params.idSeller;
        const idProduct = req.params.idProduct;
        const data = req.body;
        const product = await firestore.collection('Market').doc(idSeller).collection('Products').doc(idProduct);
        await product.update(data);
        res.send('Producto actualizado satisfactorimente');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const idSeller = req.params.idSeller;
        const idProduct = req.params.idProduct;
        await firestore.collection('Market').doc(idSeller).collection('Products').doc(idProduct).delete();
        res.send('Producto eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduct = async(req, res, next) =>{
    try {
        const idSeller = req.params.idSeller;
        const idProduct = req.params.idProduct;
        const productRef = firestore.collection('Market').doc(idSeller).collection('Products').doc(idProduct);
        const data = await productRef.get();
        if (data.empty){
            res.status(400).send("No existe este Producto")
        }
        else{  
            res.json(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProducts = async (req, res, next) =>{
    try {
        const idSeller = req.params.idSeller;
        const producstRef = firestore.collection('Market').doc(idSeller).collection('Products');
        const data = await producstRef.get();
        
        const productArray = [];

        if(data.empty){
            res.status(404).send('No hay productos para este seller');
        }
        else{
            data.forEach(element => {
                const product = new Product(
                    element.id,
                    element.data().Name,
                    element.data().Price,
                    element.data().Description,
                    element.data().id_photo,
                    element.data().link
                );
                
                productArray.push(product);
            });
            //res.send(idProductsArray);
            res.json({productArray});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProduct
}