import react, {useState, useEffect} from 'react';
import {CartItemCard} from './CartItemCard';
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom';
 
export default function ShoppingCartPage  () {
    const [total, setTotal] = useState(0); // total price
    const [fetched, setFetched] = useState([]); 

    const navigate = useNavigate();
 
    const updateTotal = (newTotal) => {
      setTotal(newTotal);
    };

    
    //extracting user id from web token
    const fetchUserId = ()=>{
      const token = localStorage.getItem('token');
      if(token){
          const decoded_token = jwtDecode(token);
          const user_id = decoded_token.id;

          return user_id;  
        }else{
          return null;
        }
    } 
    
    //check login status
    const checkLoggedIn = () =>{
        const token = localStorage.getItem('token');
        return token !== null
     }

    //fetch data from db
    useEffect(() => {
        async function fetchData() {
          try {
            const data = {
              "user_id" : fetchUserId(),
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
        if(checkLoggedIn()){
          fetchData();    
        }else{
          navigate('/login');
        }
    },[]);

    return (
        <>
           
            <h1>Shopping Cart</h1>
            {fetched.map((item) => (
                <CartItemCard key={item.item.item_id} product={item} onUpdateTotal={updateTotal} />
            ))}            
            <div className="text-end" style={{ fontSize: '1.25rem'} }><p>Total Price &#58; &#36;  {total}</p></div>
            <div className="text-end" ><button className="btn btn-info hover" onClick = {()=>navigate('/payment')}>Checkout</button></div>
        </>
    )
}

 