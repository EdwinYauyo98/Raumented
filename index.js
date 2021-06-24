'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const enterpriseRoutes = require('./routes/enterprise-routes');
const sellerRoutes = require('./routes/seller-routes');
const productRoutes = require('./routes/product-routes');
const photoRoutes = require('./routes/photo-routes');
//const puerto =process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', enterpriseRoutes.routes);
app.use('/api', sellerRoutes.routes);
app.use('/api', productRoutes.routes);
app.use('/api', photoRoutes.routes);



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
