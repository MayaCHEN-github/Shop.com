import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
 
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000; 

const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@database001.cm8wd6d.mongodb.net/?retryWrites=true&w=majority&appName=database001`;

mongoose.connect(uri).then(() => {
    console.log('MongoDB Connected…')
}).catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connection is open...");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});