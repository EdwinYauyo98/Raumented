'use strict';

const firebase = require('../db');
const Enterprise = require('../models/enterprise');
const firestore = firebase.firestore();

const addEnterprise = async (req, res, next) => {
    try{
        const data = req.body;
        console.log(data);
        await firestore.collection('Enterprise').doc().set(data);
        res.send('Empresa registrada');
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEnterprise
}