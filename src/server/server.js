import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

const PORT = 3001 ; 
//3001

const mongoose = require('mongoose');
const uri = 'mongodb+srv://Shop_com:iD5HFvC4Ly9YKb2j@shop-comdb.rn4suxq.mongodb.net/Shop_com';

//
mongoose.connect(uri).then(() => {
    console.log('MongoDB Connected…')
}).catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log("Connection is open...");

  const ItemSchema = new mongoose.Schema({
    item_id:{
        type: String,
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
    url:{
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
            type: String,
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
            unique: true,
        },
        shopping_cart:[
            {
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true
                },
                purchased: {
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
    
    // =================================================================
    app.get('/all-items',async (req, res)=>{
        try{
            const items = await Item.find({});
            res.status(200).json(items);
        }catch(err){
            res.status(500).send('Failed fetching items');
        }
    });

    app.post('/all-cart-items', async (req, res) => {
        const {user_id} = req.body;
        try{
            const user = await User.findOne({"user_id" : user_id}).populate('shopping_cart.item');

            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            const user_cart = user.shopping_cart;

            if (!user_cart) {
                res.status(404).send('Unable to fetch user\'s cart');
                return;
            }
 
            const total = user_cart.reduce((sum, item) =>   sum + 100 * parseFloat(item.item.price) * parseInt(item.purchased, 10), 0)/100;
            
            if(user_cart && user){
                res.status(200).json({
                    items: user_cart,
                    total: total,
                });
            }else{
                res.status(404).send('Error retrieving cart');
            }
        }catch(err){
            res.status(500).send(err,'Error fetching user\'s cart');
        }

    });


    //Quantity +1 handler
    app.post('/quantity-plus-one', async (req,res)=>{
        const {user_id, item_id} = req.body;
        try{
        const user = await User.findOne({user_id : user_id}).populate('shopping_cart.item');

        if(!user){
            res.status(404).send('Failed fetching user');
        }

        const target_item_index = user.shopping_cart.findIndex((item) => item.item.item_id.toString() === item_id);

        const target_item = user.shopping_cart[target_item_index];

        if (target_item_index !== -1) {
            const stock_quantity = target_item.item.stock_quantity;

            if(stock_quantity > target_item.purchased){
                target_item.purchased += 1;
                await user.save(); 
                
                const subtotal = (100  * target_item.item.price) * target_item.purchased / 100;
                const user_cart = user.shopping_cart; 

                if (!user_cart) {
                    res.status(404).send('Unable to fetch user\'s cart');
                    return;
                }
     
                const total = user_cart.reduce((sum, item) =>   sum + (100 * parseFloat(item.item.price) )* parseInt(item.purchased, 10), 0)/ 100;

                const updated_result = {
                    purchased: target_item.purchased,
                    subtotal: subtotal,
                    total:total
                }

                res.status(200).json(updated_result);
            }else{
                res.status(400).json({"message":`Item ${item_id} purchased quantity exceeded stock quantity`});
            }
        } else {
            res.status(404).send('Item not found in shopping cart');
        }
        }catch(err){
            console.log(err);
            res.status(500).send('Failed updating quantity on shopping cart')
        }
    });

    //Quantity -1 handler
    app.post('/quantity-minus-one', async (req,res)=>{
        const {user_id, item_id} = req.body;
        try{
            const user = await User.findOne({user_id : user_id}).populate('shopping_cart.item');

            if(!user){
                res.status(404).send('Failed fetching user');
            }

            const target_item_index = user.shopping_cart.findIndex((item) => item.item.item_id.toString() == item_id);
            
            const target_item = user.shopping_cart[target_item_index];
            
            if (target_item_index !== -1) {
                if(target_item.purchased>= 1){
                    if(target_item.purchased > 1){
                        target_item.purchased -= 1;
                        await user.save();   
                                  
                        const subtotal = (100  * target_item.item.price) * target_item.purchased / 100;
                        const user_cart = user.shopping_cart;

                        if (!user_cart) {
                            res.status(404).send('Unable to fetch user\'s cart');
                            return;
                        }
            
                        const total = user_cart.reduce((sum, item) =>   sum + 100 * parseFloat(item.item.price) * parseInt(item.purchased, 10), 0) / 100;

                        const updated_result = {
                            purchased: target_item.purchased,
                            subtotal: subtotal,
                            total: total
                        }
        
                        res.status(200).json(updated_result);
                    }else{ 
                        user.shopping_cart.splice(target_item_index,1);
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
            res.status(500).send('Failed updating quantity on shopping cart')
        }
    });

    //delete item handler
    app.delete('/delete-item', async (req,res)=>{
        const {user_id, item_id} = req.body;
        try{
        const user = await User.findOne({user_id : user_id}).populate('shopping_cart.item');
       
        if(!user){
            res.status(404).send('Failed fetching user');
        }

        const target_item_index = user.shopping_cart.findIndex((item) => item.item.item_id.toString() === item_id);

        if (target_item_index !== -1) {
            user.shopping_cart.splice(target_item_index,1);
            await user.save();
            const user_cart = user.shopping_cart;

            if (!user_cart) {
                res.status(404).send('Unable to fetch user\'s cart');
                return;
            }
     
            const total = user_cart.reduce((sum, item) =>   sum + 100 * parseFloat(item.item.price) * parseInt(item.purchased, 10), 0)/100;
             
            res.status(202).json({"total":total});
        }else {
            res.status(404).send('Item not found in shopping cart');
        }
    }catch(err){
            console.log(err);
            res.status(500).send(`Failed deleting item ${item_id} from shopping cart`)
        }

    });

});


 





app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});