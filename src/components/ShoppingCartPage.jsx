import react, {useState, useEffect} from 'react';
import {ShoppingCartItem} from './ShoppingCartItem.jsx';

export  function ShoppingCartPage(){
    const [total, setTotal] = useState(0);
    const [fetched, setFetched] = useState([]);

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('Shop.com/src/mockdata/mockitems.json');
            if (!response.ok) {
              throw new Error('Error');
            }
            const products = await response.json();
            setFetched(products);
            setTotal(products.reduce((sum, product) => sum + product.price , 0)); //include purchased quantity later
          } catch (err) {
            console.error(err);
          }
        }

        fetchData();    
    },[]);

    return (
        <>
            <h1>Shopping Cart</h1>
            <div>
              {fetched.map(product => (
                  <ShoppingCartItem key={product.id} product={product} />
              ))}
            </div>
            <div><p>Total Price {total}</p></div>
        </>
    )
}