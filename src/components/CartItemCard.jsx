import react, {useState, useEffect} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import "../styles/shopping_cart_item.css";

export function CartItemCard ({product}){

    const [purchased, setPurchased] = useState(product.purchased);
    const [subtotal, setSubtotal] = useState((product.purchased * product.price).toFixed(2));

    const user_id = "001";

    const QuantityPlusOne = async () =>{
        if(purchased >= 1){
            try{
                const params = {
                    "user_id": user_id,
                    "item_id": product.item_id
                };        

                const response = await fetch('/quantity-plus-one',{
                    method: 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(params)
                });

                if (!response.ok) {
                    throw new Error('Error updating quantity of shopping cart item');
                  }
                
                const data = await response.json();

                  setPurchased(purchased - 1);
            }catch(err) {console.log(err)}
        }
        setPurchased(purchased + 1);
    }

    const QuantityMinusOne = async () =>{
        if(purchased >= 1){
            try{
                const params = {
                    "user_id": user_id,
                    "item_id": product.item_id
                };        

                const response = await fetch('/quantity-add-one',{
                    method: 'POST',
                    headers : {
                        'Content-Type':'application/json'
                    },
                    body : JSON.stringify(params)
                });

                if (!response.ok) {
                    throw new Error('Error updating quantity of shopping cart item');
                  }
                
                const data = await response.json();

                  setPurchased(purchased - 1);
            }catch(err) {console.log(err)}
        }
    }
  
    const DeleteFromCart =  async() =>{
        if(confirm("Are you sure you want to delete this item from cart? \n(This action is irreversible)")){
            if(purchased > 0){
                try{
                    const data = {
                        "user_id": user_id,
                        "item_id": product.item_id
                    };        

                    const response = await fetch('/quantity-add-one',{
                        method: 'POST',
                        headers : {
                            'Content-Type':'application/json'
                        },
                        body : JSON.stringify(data)
                    });


                    if (!response.ok) {
                        throw new Error('Error updating quantity of shopping cart item');
                    }
                    
                    setPurchased(purchased - 1);
                }catch(err) {console.log(err)}
        }
    }
 
    return (
        <div className="row card-item hover-shadow rounded-2 my-1">
            <div className="col col-md-2">
                <img src="" alt={product.name}/>
            </div>
            <div className="col col-md-10">
                <div className='row'>
                    <div className="col col-md-9 text-start">
                        <p className="product-name mb-0">{product.name} </p>
                        <p className="vendor-name">{product.vendor}</p>
                    </div>
                    <div className="col col-md-3 text-end ">
                        <p className="price mb-0">Price &#58; &#36; {product.price}</p>
                        <div className="d-flex justify-content-end ">
                                <div><FiPlusCircle onClick={QuantityPlusOne}/></div>
                                <div className="mx-1"><p>Quantity {product.purchased} </p></div>
                                <div><FiMinusCircle onClick={QuantityMinusOne}/></div>
                                <div className="mx-2"><BsTrash onClick={DeleteFromCart}/></div>
                        </div>
                        <p>Subtotal &#58; &#36; {subtotal}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;

/*
to-do

1. setup db connection
2. define product schemas
3. expand on fcns requiring db operations(+/1)
4.

*/