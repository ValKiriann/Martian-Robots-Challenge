const express = require ('express');
const bodyParser = require('body-parser');
const {port} = require('./config.json');
const router = require('./routes/network');

let app = express();
app.use(bodyParser.json({ extended: false }));
app.use(router);
app.listen(port);

console.log(`Listening to http://localhost:${port}`);