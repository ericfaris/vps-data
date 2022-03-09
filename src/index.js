// importing the dependencies
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const PORT = 5080;
const v1Router = require('./routers/api.v1')
const {VPSDataHelper} = require('./helpers/VPSDataHelper')

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/api/v1', async function (req, res, next) {
  let vpsDataHelper = new VPSDataHelper();
  const json = await vpsDataHelper.getJson(); 
  req.vpsData = json;
  next();
}, v1Router);

// starting the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT} `);
});