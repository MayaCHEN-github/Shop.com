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
const uri = "mongodb+srv://Shop_com:iD5HFvC4Ly9YKb2j@shop-comdb.rn4suxq.mongodb.net/Shop_com";

mongoose.connect(uri).then(() => {
    console.log('MongoDB Connected…')
}).catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connection is open...");
});

const Schema = mongoose.Schema;

// Note: These schema is for testing. Have we defined the detailed schema for database in our document?
const AdminSchema = new Schema({
  name: String,
  description: String
});

const ProductSchema = new Schema({
  name: String,
  description: String
});

const UserSchema = new Schema({
  name: String,
  description: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);

// Note: These are data for testing. When we run the server, these data will be saved to the database.
// We can check the data in the MongoDB Compass. You can delete these code after testing.
const admin = new Admin({name: 'Admin', description: 'This is a test admin.'});
const product = new Product({name: 'Product', description: 'This is a test product.'});
const user = new User({name: 'User', description: 'This is a test user.'});
try {
  await admin.save();
  console.log('Admin saved successfully!');
  await product.save();
  console.log('Product saved successfully!');
  await user.save();
  console.log('User saved successfully!');
} catch (err) {
    console.error(err);
}


app.get('/admins', (req, res) => {
  Admin.find((err, admins) => {
    if (err) return console.error(err);
    res.json(admins);
  });
});

app.get('/products', (req, res) => {
  Product.find((err, products) => {
    if (err) return console.error(err);
    res.json(products);
  });
});

app.get('/users', (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.json(users);
  });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});