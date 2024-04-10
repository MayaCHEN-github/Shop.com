import react, {useState, useEffect} from 'react';
import { FiPlusCircle, FiMinusCircle} from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import '../../styles/shopping_cart_item.css';
 
export function OrderCard ({product, onUpdateTotal, stage}){

    const [purchased, setPurchased] = useState(product.purchased);
    const [subtotal, setSubtotal] = useState((product.purchased * product.item.price).toFixed(2));
    const [invisible, setInvisible] = useState(false);

    const user_id = "001";
 
    return (
        <div className={`row`}>
            <div className="col col-md-2 d-flex justify-content-center align-items-center overflow-hidden">
                <img src={product.item.url} alt={product.item.name} style={{maxWidth: '75%', maxHeight: '75%', objectFit: 'contain'}}/>
            </div>
            <div className="col col-md-10">
                <div className='row '>
                    <div className="col col-md-9 text-start">
                        <p style={{fontSize:15}} className="item-name mb-0">{product.item.name} </p>
                        <p style={{fontSize:15}} className="vendor-name">{product.item.vendor}</p>
                        <p style={{fontSize:15,color:'red'}} className="vendor-name">{stage}</p>
                    </div>
                    <div className="col col-md-3 text-end ">
                                <div className="mx-1"><p>Quantity&#58; {purchased} </p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}