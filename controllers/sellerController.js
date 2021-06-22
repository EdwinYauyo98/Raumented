'use strict';

const firebase = require('../db');
const Seller = require('../models/seller');
const firestore = firebase.firestore();



const addSeller = async (req, res, next) =>{
    try{
        const data = req.body;
        const sellerRef = firestore.collection('Seller');
        const snapshot = await sellerRef.where('Email', '==', data.Email).get();
        if(!snapshot.empty){
            res.send('Correo ya registrado');
        }
        else{
            await firestore.collection('Seller').doc().set(data);
            res.send('Seller registrado');
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const loginSeller = async (req, res, next) =>{
    try{
        const {Email, Password} = req.body;
        //console.log(Email);
        //console.log(Password);
        const sellerRef = firestore.collection('Seller');
        const snapshot = await sellerRef.where('email', '==', Email).get();
        if(snapshot.empty){
            res.send('Email no registrado');
        }
        else{
            snapshot.forEach(element => {
              if (element.data().password == Password){
                  res.send('Usuario Logeado');
              }
              else{
                  res.send('Contraseña incorrecta');
              }
            });
        }

    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSeller,
    loginSeller
}