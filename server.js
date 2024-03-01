const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


//.env config
dotenv.config();

//mongodb connection
connectDb();

//rest object

const app = express();

//middlewares

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// port
const port = process.env.PORT || 8000;

//listen port

app.listen(port, () => {
    console.log(`server running in ${process.env.NODE_MODE} Node on port ${process.env.PORT}`.bgCyan.white);
});