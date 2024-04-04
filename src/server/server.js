import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

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
                item: {
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

        try{
            const user = await User.findOne({user_id : user_id}).populate('shopping_cart');

            const user_cart = user.shopping_cart;

            const total = user_cart.reduce((sum, item) =>   sum + parseFloat(item.price) * parseInt(item.purchased, 10), 0).toFixed(2);
            if(user_cart && user){
                res.json({
                    items: user_cart,
                    total: total,
                });
            }else{
                res.status(404).send('Error retrieving cart');
            }
        }catch(err){
            res.status(500).send(err,'Error fetching users cart');
        }

    });

    //Quantity +1 handler
    app.post('/quantity-plus-one', async (req,res)=>{
        const {user_id, item_id} = req.body;
        const user = await User.findOne({user_id : user_id}).populate('shopping_cart');

        const target_item_index = user.shopping_cart.find((item) => item.item_id.toString() === item_id);

        if (target_item_index !== -1) {
            const item = await Item.findOne({item_id:item_id});
            const stock_quantity = item.stock_quantity;

            if(stock_quantity > user.shopping_cart[target_item_index].purchased){
               user.shopping_cart[target_item_index].purchased += 1;
                await user.save();             
                res.status(200).send(`Item ${item_id} quantity increased by 1`);
            }else{
                res.status(404).send(`Item ${item_id} purchased quantity exceeded stock quantiy`);
            }
        } else {
            res.status(404).send('Item not found in shopping cart');
        }
    });

    //Quantity -1 handler
    app.post('/quantity-minus-one', async (req,res)=>{
        const {user_id, item_id} = req.body;
        try{
            const user = await User.findOne({user_id : user_id}).populate('shopping_cart');

            const target_item_index = user.shopping_cart.find((item) => item.item_id.toString() === item_id);

            if (target_item_index !== -1) {
                if(Number(user.shopping_cart[target_item_index].purchased) >= 1){
                    if(Number(user.shopping_cart[target_item_index].purchased) > 1){
                        user.shopping_cart[target_item_index].purchased -= 1;
                        await user.save();             
                        res.status(202).send(`Item ${item_id} quantity decreased by 1`);
                    }else if(Number(user.shopping_cart[target_item_index].purchased) === 1){ 
                        user.shopping_cart.splice(target_item_index-1,1);
                        await user.save();             
                        res.status(202).send(`Item ${item_id} deleted from cart`);
                    }
                }else{
                    res.status(200).send(`Item ${item_id} purchased quantity exceeded stock quantiy`);
                }
            } else {
                res.status(404).send('Item not found in shopping cart');
            }
        }catch(err){
            console.log(err);
        }
    });

    //delete item handler
    app.delete('/delete-item', async (req,res)=>{
        const {user_id, item_id} = req.body;
        try{
        const user = await User.findOne({user_id : user_id}).populate('shopping_cart');

        const target_item_index = user.shopping_cart.find((item) => item.item_id.toString() === item_id);

        if (target_item_index !== -1) {
            user.shopping_cart.splice(target_item_index-1,1);
            await user.save();             
            res.status(202).send(`Item ${item_id} deleted from cart`);
        }else {
            res.status(404).send('Item not found in shopping cart');
        }
    }catch((err)=>{console.log(err)});

    });

    });










});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});