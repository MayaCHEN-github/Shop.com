import react, {useState, useEffect} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import "../styles/shopping_cart_item.css";

export function CartItemCard ({product}){

    const [purchased, setPurchased] = useState(product.purchased);
    const [subtotal, setSubtotal] = useState((product.purchased * product.price).toFixed(2));

    const QuantityPlusOne =  () =>{
        //add changes to db shopping cart
        setPurchased(purchased + 1);
    }

    const QuantityMinusOne =  () =>{
        if(purchased >= 1){
            //add changes to db shopping cart        
            setPurchased(purchased - 1);
        }
    }
  
    const DeleteFromCart =  () =>{
        if(purchased > 0){
            //add changes to db shopping cart        
            setPurchased(0);
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