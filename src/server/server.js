import {createRequire} from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const PORT = 3001 ; 
const secretKey = 'shopdotcom';
//3001
 
const authenticateToken = (req, res, next) => {
    const token = req.headers['x-access-token']?.split(' ')[1];
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {

                console.log(JSON.stringify(err));
                return res.status(500).json({
                    isLoggedIn: false,
                    message: "Failed authentication."
                });
            }
            req.user = {
                user_id: decoded.user_id,
                username: decoded.username
            };

            console.log(JSON.stringify(req.user));
            next();
        });
    } else {
        return res.status(401).json({ error: 'Authentication failed, token not provided.' });
    }
};


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
    name: {
        type: String,
        required: true
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
    curated: {
        type: Boolean,
        default: false
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
    }],
    rating:{
        type:Number,
        required:true
    },
    rating_count:{
      type:Number,
      required:true
  }
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
    app.post('/signup', async (req, res) => {
        const {username, password, email} = req.body;
        const new_password = await bcrypt.hash(password,10);
        try{
            const maxUser  = await User.findOne().sort({ user_id: -1 }).exec();
        const user_id = maxUser ? Number(maxUser.user_id) + 1 : 1;

            const new_user = new User({user_id:user_id,username: username, password: new_password, email:email});
            new_user.save().then(() => {
                res.status(200).json({message:"success"});
            }).catch(err => {
                res.status(404).json({message:err});
            });      
        }catch(e){
            res.status(404).json({message:"failed"});
        }
    })

    app.post('/login', async (req, res) => {
        const {usernameOrEmail, password} = req.body;

        const hashed_password = await bcrypt.hash(password,10);

        try{
            const matching_user =  User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });

            if(!matching_user){
                const matching_admin =  Admin.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
                if(!matching_admin){
                    res.status(404).json({ message:"user not found"});
                }

                const compare_password = bcrypt.compare(hashed_password,matching_admin.password);

                if(compare_password){
                    jwt.sign(
                        { 
                            id: matching_admin.user_id,
                            user_type: "admin",
                            username: matching_admin.username
                        },  
                        secretKey,
                        { expiresIn: '12h' },
                        (err,token)=>{
                            if(err){
                                return res.status(500).json({message: err})
                            }
                            return res.status(200).json({message: "success",token:token })
                        }  
                    );
 
                }else{
                    res.status(500).json({ message:"Incorrect password"});
                }            
            }

            const compare_password = await bcrypt.compare(hashed_password,matching_user.password);

            if(compare_password){
                const token = jwt.sign(
                    { 
                        id: matching_user.user_id,
                        user_type: "admin",
                        username: matching_user.username
                    },  
                    secretKey,
                    { expiresIn: '12h' }  
                );

                res.status(200).json({ message:"success",token:token});
            }else{
                res.status(500).json({ message:"Incorrect password"});
            }
        }catch(e){
            res.status(404).json({message:"failed"});
        }
    })

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

    // ===Admin Functions:==============================================================

    app.get('/all-users', async (req, res) => {
      try {
          const users = await User.find({});
          res.status(200).json(users);
      } catch (err) {
          console.error(err); 
          res.status(500).send('Admin Functions: Failed fetching users.');
      }
    });

    app.get('/all-products', async (req, res) => {
      try {
          const items = await Item.find({});
          res.status(200).json(items);
      } catch (err) {
          console.error(err); 
          res.status(500).send('Admin Functions: Failed fetching items.');
      }
    });


    app.post('/add-user', async (req, res) => {
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send('Admin Functions: Failed to add user.');
    }
    });

    app.put('/edit-user/:id', async (req, res) => {
      try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.status(200).json(updatedUser);
      } catch (err) {
          res.status(500).send('Admin Functions: Failed to edit user.');
      }
    });

    app.delete('/delete-user/:id', async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send('User deleted');
        } catch (err) {
            res.status(500).send('Admin Functions: Failed to delete user');
        }
    });

    
    app.post('/add-product', async (req, res) => {
        const newItem = new Item(req.body);
        try {
            await newItem.save();
            res.status(201).json(newItem);
        } catch (err) {
            console.error(err);
            res.status(500).send('Admin Functions: Failed to add product.');
        }
    });


    app.put('/edit-product/:id', async (req, res) => {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(updatedItem);
        } catch (err) {
            console.error(err);
            res.status(500).send('Admin Functions: Failed to edit product.');
        }
    });


    app.delete('/delete-product/:id', async (req, res) => {
        try {
            await Item.findByIdAndDelete(req.params.id);
            res.status(200).send('Product deleted');
        } catch (err) {
            console.error(err);
            res.status(500).send('Admin Functions: Failed to delete product.');
        }
    });

    // ===Product functions=====================================================
    app.get('/product/:id', async (req, res) => {
      try {
        const item = await Item.find({ item_id: req.params.id });
        res.status(200).json(item);
      } catch (err) {
        console.error(err);
        res.status(500).send('Product Functions: Failed to find product with the specified id.');
      }
    })

    app.get('/category/:category', async (req, res) => {
      try {
        const item = await Item.find({ category: req.params.category });
        res.status(200).json(item);
      } catch (err) {
        console.error(err);
        res.status(500).send(`Product Functions: Failed to find products with the specified category ${req.params.category}.`);
      }
    })

});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});