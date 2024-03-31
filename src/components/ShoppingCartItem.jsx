import react, {useState, useEffect} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import "../styles/shopping_cart_item.css";

function ShoppingCartItem ({product}){

    const [purchased, setPurchased] = useState(0);

    const QuantityPlusOne = async () =>{
        //add changes to db shopping cart
        setPurchased(purchased + 1);
    }

    const QuantityMinusOne = async () =>{
        if(purchased >= 1){
            //add changes to db shopping cart        
            setPurchased(purchased - 1);
        }
    }
  
    const DeleteFromCart = async () =>{
        if(purchased > 0){
            //add changes to db shopping cart        
            setPurchased(0);
        }
    }
 
    return (
        <div className="row bg-warning hover-shadow rounded-2">
            <div className="col col-md-2">
                <img src="" alt="sample image"/>
            </div>
            <div className="col col-md-10">
                <div className='row'>
                    <div className="col col-md-9 text-start">
                        <p className="product-name mb-0">Product name  </p>
                        <p className="vendor-name">Vendor</p>
                    </div>
                    <div className="col col-md-3 text-end ">
                        <p className="price mb-0">Price &#58; &#36; </p>
                        <div className="d-flex justify-content-end ">
                                <div><FiPlusCircle onClick={QuantityPlusOne}/></div>
                                <div className="mx-1"><p>Quantity &#58; </p></div>
                                <div><FiMinusCircle onClick={QuantityMinusOne}/></div>
                                <div><BsTrash onClick={DeleteFromCart}/></div>
                        </div>
                        <p>Subtotal &#58; &#36;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem;