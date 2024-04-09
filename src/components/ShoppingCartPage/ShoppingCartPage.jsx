import react, {useState, useEffect} from 'react';
import {CartItemCard} from './CartItemCard';

export default function ShoppingCartPage  () {
    const [total, setTotal] = useState(0);
    const [fetched, setFetched] = useState([]);

    const user_id = "001"; // delete this line after setting up account management

    const updateTotal = (newTotal) => {
      setTotal(newTotal);
    };

    /**
    import jwt_decode from 'jwt_decode'

    const fetchUserId = ()=>{
      const token = localStorage.getItem('token');
      if(token){
          decoded_token = jwt_decode(token);
          user_id = decoded_token.user_id;

          return user_id;  
        }else{
          return null;
        }
    }
     
     const checkLoggedIn = () =>{
        const token = localStorage.getItem('token');
        return token !== null
     }

     
         useEffect(() => {
          if(checkLoggedIn){
            const user_id = fetchUserId();
            async function fetchData() {
              try {
                const data = {
                  "user_id" : user_id
                };

                const response = await fetch('http://localhost:3001/all-cart-items',{
                  method : 'POST',
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
                });

                if (!response.ok) {
                  throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const items = await response.json();
              
                  setFetched(items.items);
                  setTotal(items.total); 
                } catch (err) {
                  console.error(err);
                }
              }
      
              fetchData();
          }else{
            navigate('/login');
          }    
      },[navigate]);

     */

    useEffect(() => {
        async function fetchData() {
          try {
            const data = {
              "user_id" : user_id
            };

            const response = await fetch('http://localhost:3001/all-cart-items',{
              method : 'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });

            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const items = await response.json();
            /*
            items=
              {         
                    items: user_cart,
                    total: total,
              }
            */
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
                <CartItemCard key={item.item.item_id} product={item} onUpdateTotal={updateTotal} />
            ))}            
            <div className="text-end" style={{ fontSize: '1.25rem'} }><p>Total Price &#58; &#36;  {total}</p></div>
            <div className="text-end" ><button className="btn btn-info hover">Checkout</button></div>
        </>
    )
}

/*TO-DO
1. redirect user to login page when not logged in when they try to access the shopping cart
2. set a value of user_id to actual user's id in token
3.

*/