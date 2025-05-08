const express = require('express');
const { connectToMongoDb } = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly } = require('./middlewares/auth');

//importing routes
const urlRoute = require('./routes/url');
const redirectRoute = require('./routes/redirect');
const homeRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


//created app instance
const app = express();
const PORT = 8001;

//connecting mongodb
connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("MongoDB connected succesfully!"))
  .catch((err) => {
    console.log("MongoDb connection error : ", err);
  });

//setting ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/', restrictToLoggedinUserOnly, homeRoute);
app.use('/', redirectRoute);
app.use('/url', restrictToLoggedinUserOnly,  urlRoute);
app.use('/', userRoute);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
})