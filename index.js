const express = require('express'); /// Way to do imports in node.
require('dotenv').config(); //To use environment variables.

const cors = require('cors'); //To enable CORS

const { dbConnection } = require('./database/config');

//Create express server
const app = express(); //Initializes express application.

//Mongoose
// Connection String 
// mongodb+srv://artturobld:<password>@clustermongodb.829ur.mongodb.net/test
// mongodb+srv://artturobld:*****@clustermongodb.829ur.mongodb.net/test?authSource=admin&replicaSet=atlas-lhmgsr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

//Enabling CORS
app.use(cors())

//Database
dbConnection();

    console.log(process.env);
//Routes
// req - Request
// res - Response
app.get( '/', (req, res) => {
    res.status(400).json({
        ok:true,
        msg: 'Hello World'
    })
} );



//Instruction to specify port which the JS app uses
app.listen(process.env.PORT, () => {
    console.log('Server Running in port ' + process.env.PORT);
});