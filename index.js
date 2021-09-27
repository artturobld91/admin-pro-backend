const express = require('express'); /// Way to do imports in node.
require('dotenv').config(); //To use environment variables.
const path = require('path');

const cors = require('cors'); //To enable CORS

const { dbConnection } = require('./database/config');

//Create express server
const app = express(); //Initializes express application.

//Mongoose
// Connection String 
// mongodb+srv://artturobld:<password>@clustermongodb.829ur.mongodb.net/test
// mongodb+srv://artturobld:*****@clustermongodb.829ur.mongodb.net/test?authSource=admin&replicaSet=atlas-lhmgsr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

//Enabling CORS
app.use(cors());

//Body Read and Parse - Note: This line should be placed before Routes
app.use(express.json());

//Database
dbConnection();

//Public Directory
app.use(express.static('public'));

console.log(process.env);
    
//Routes
// req - Request
// res - Response
app.get( '/', (req, res) => {
    res.status(200).json({
        ok:true,
        msg: 'Hello World'
    })
} );

//Routes
app.use('/api/users', require('./routes/usersroutes'));
app.use('/api/hospitals', require('./routes/hospitalsroutes'));
app.use('/api/doctors', require('./routes/doctorsroutes'));
app.use('/api/search', require('./routes/searchroutes'));
app.use('/api/upload', require('./routes/uploadsroutes'));
app.use('/api/login', require('./routes/auth'));

//Last Route
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') )
});


//Instruction to specify port which the JS app uses
app.listen(process.env.PORT, () => {
    console.log('Server Running in port ' + process.env.PORT);
});