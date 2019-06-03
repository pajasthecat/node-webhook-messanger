const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

//Middlewear
app.use(bodyParser);
app.use(helmet);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`))