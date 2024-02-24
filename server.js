const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

//.env config
dotenv.config();

//rest object

const app = express();

//middlewares

app.use(express.json());
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {
    res.status(200).send({
        message: "server running successfully"
    });
});

// port
const port = process.env.PORT || 8080

//listen port

app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} Node on port ${process.env.PORT}`.bgCyan.white);
});