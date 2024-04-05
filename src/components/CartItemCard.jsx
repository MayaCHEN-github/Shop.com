import react, {useState} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import "../styles/shopping_cart_item.css";

export function CartItemCard ({product, onDelete, onPlusOne, onMinusOne}}){

    const [purchased, setPurchased] = useState(product.purchased);
    const [subtotal, setSubtotal] = useState((product.purchased * product.item.price).toFixed(2));

    const user_id = "001";

    const QuantityPlusOne = ()=> {
        onPlusOne(product.item.item_id);

    }

    const QuantityMinusOne = ()=> {
        onMinusOne(product.item.item_id);
        
    }

    const DeleteFromCart = () => {
        onDelete(product.item.item_id);
    };
    
    return (
        <div className="row card-item hover-shadow rounded-2 my-1">
            <div className="col col-md-2">
                <img src='' alt={product.item.name}/>
            </div>
            <div className="col col-md-10">
                <div className='row'>
                    <div className="col col-md-9 text-start">
                        <p className="product-name mb-0">{product.item.name} </p>
                        <p className="vendor-name">{product.item.vendor}</p>
                    </div>
                    <div className="col col-md-3 text-end ">
                        <p className="price mb-0">Price &#58; &#36; {product.item.price}</p>
                        <div className="d-flex justify-content-end ">
                                <div className="plus-one"><FiPlusCircle onClick={QuantityPlusOne}/></div>
                                <div className="mx-1"><p>Quantity {purchased} </p></div>
                                <div className="minus-one"><FiMinusCircle onClick={QuantityMinusOne}/></div>
                                <div className="mx-2 trash-can"><BsTrash onClick={DeleteFromCart}/></div>
                        </div>
                        <p>Subtotal &#58; &#36; {subtotal}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}