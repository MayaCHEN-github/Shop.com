import react, {useState, useEffect} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import '../../styles/shopping_cart_item.css';
 
export function CartPayCard ({product, onUpdateTotal}){

    const [purchased, setPurchased] = useState(product.purchased);
    const [subtotal, setSubtotal] = useState((product.purchased * product.item.price).toFixed(2));
    const [invisible, setInvisible] = useState(false);

    const user_id = "001";
 
    return (
        <div className='row'>
            <div className="col justify-content-center align-items-center overflow-hidden">
                <img src={product.item.url} alt={product.item.name} style={{maxWidth: '70px', maxHeight: '68px'}}/>
            </div>
            <div  style={{width:520,height:70}}>
                <div className='row '>
                    <div className="text-start">
                        <div style={{fontSize:10}}>{product.item.name} </div>
                        <div style={{fontSize:10}}>{product.item.vendor}</div>
                    </div>
                    <div style={{marginLeft:"30%"}}>
                        <div style={{fontSize:9}}>Price &#58; &#36; {product.item.price}</div>
                        <div>
                            <div style={{fontSize:9}}>Quantity&#58; {purchased}</div>
                        </div>
                        <div style={{fontSize:9}}>Subtotal &#58; &#36; {subtotal}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}