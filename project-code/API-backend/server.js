const express = require("express");
// const axios = require("axios");
const cors = require('cors');
const bodyParser = require('body-parser');
const searchRoutes = require('./Routes/routes')
const logger = require('morgan');



const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api/v1', searchRoutes);

app.listen(8000 , ()=> {
    console.log("Server is running on port 8000");
})
