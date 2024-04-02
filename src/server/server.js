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
const uri = 'mongodb+srv://Shop_com:iD5HFvC4Ly9YKb2j@shop-comdb.rn4suxq.mongodb.net/Shop_com';

mongoose.connect(uri).then(() => {
    console.log('MongoDB Connected…')
}).catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connection is open...");

  const ItemSchema = new mongoose.Schema({
    product_id:{
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    vendor:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    stock_quantity:{
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: [String],
        required: true
    },
    image_url:{
        type: [String]
    },
    comments:[{
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        comment: {
            type: String,
            required: [true, "Comment is required"],
        },
        rating:{
            type: Number,
            required: [true, "Rating is required"],
        }
    }]
});

const Item =  mongoose.model("Item",ItemSchema);

const UserSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    shopping_cart:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
});

const User = mongoose.model("User", UserSchema);

const AdminSchema = new mongoose.Schema({
    user_id:{
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
})

const Admin = mongoose.model("Admin", AdminSchema);

app.post('/all-cart-items', async (req, res) => {
    const {user_id} = req.body;

    const user = User.findOne({user_id);

})

});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});