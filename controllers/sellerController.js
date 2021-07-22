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
        const snapshot = await sellerRef.where('Email', '==', Email).get();
        if(snapshot.empty){
            res.send('Email no registrado');
        }
        else{
            snapshot.forEach(element => {
              if (element.data().Password == Password){
                  res.json({"idSeller": element.id});
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

const getSellers = async(req, res, next) =>{
    try {
        const sellerRef = firestore.collection('Seller');
        const data = await sellerRef.get();
        const idsellerArray = [];
        const sellerArray = [];
        if(data.empty){
            res.status(404).send('No hay sellers para mostrar');
        } else{
            data.forEach(element => {
                const seller = new Seller(
                    element.data().DNI,
                    element.data().Name,
                    element.data().Contact,
                    element.data().Email,
                    element.data().Password
                );
                idsellerArray.push(element.id);
                sellerArray.push(seller);
            });
            res.json({idsellerArray, sellerArray});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSeller = async(req, res, next) =>{
    try{
        const idSeller = req.params.idSeller;
        const sellerRef = firestore.collection('Seller').doc(idSeller);
        const data = await sellerRef.get();
        if (data.empty){
            res.status(400).send("No existe este Seller")
        }
        else{  
            res.json(data.data());
        }

    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const editSeller = async (req, res, next) =>{
    try {
        const idSeller = req.params.idSeller;
        const data = req.body;
        const seller = firestore.collection('Seller').doc(idSeller);
        await seller.update(data);
        res.send('Seller actualizado satisfactoriamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addSeller,
    loginSeller,
    editSeller,
    getSeller,
    getSellers
}