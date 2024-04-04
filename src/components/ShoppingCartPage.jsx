import react, {useState, useEffect} from 'react';
import {CartItemCard} from './CartItemCard';
export function ShoppingCartPage(){
    const [total, setTotal] = useState(0);
    const [fetched, setFetched] = useState([]);

    const user_id = "001"; // delete this line after setting up account management

    useEffect(() => {
        async function fetchData() {
          try {
            const data = {
              "user_id" : user_id
            };
            const response = await fetch('/all-cart-items',{
              method : 'POST',
              body: JSON.stringify(data)
            });

            if (!response.ok) {
              throw new Error('Error fetching shopping cart of user');
            }

            const items = await response.json();
            setFetched(items.items);
            setTotal(items.total); 
          } catch (err) {
            console.error(err);
          }
        }

        fetchData();    
    },[]);

    return (
        <>
            <h1>Shopping Cart</h1>
            {fetched.map((item) => (
                <CartItemCard key={item.item_id} product={item} />
            ))}            
            <div className="text-end" style={{ fontSize: '1.25rem'} }><p>Total Price &#58; &#36;  {total}</p></div>
            <div className="text-end" ><button className="btn btn-info hover">Checkout</button></div>
        </>
    )
}