const express = require('express');
const urlRoute = require('./routes/url');
const redirectRoute = require('./routes/redirect');
const { connectToMongoDb } = require('./connection');

const app = express();
const PORT = 8001;

connectToMongoDb('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("MongoDB connected succesfully!"))
  .catch((err) => {
    console.log("MongoDb connection error : ", err);
  });

app.use(express.urlencoded({ extended: true }));

app.use('/', redirectRoute);
app.use('/url', urlRoute);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
})