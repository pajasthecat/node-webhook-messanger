const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();

//Middlewear
app.use(bodyParser.json());
app.use(helmet());

const webhook = require("./controllers/webhook");

app.use("/v1/api/webhook", webhook)

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`))