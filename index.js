const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/diegogay', function (req, res) {
  res.send('si papi confirmo');
});



app.listen(PORT, function () {
  console.log('Example app listening on port 5000!');
});