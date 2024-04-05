import react, {useState, useEffect, useCallback} from 'react';
import {CartItemCard} from './CartItemCard';
export function ShoppingCartPage(){
    const [total, setTotal] = useState(0);
    const [fetched, setFetched] = useState([]);

    const user_id = "001"; // delete this line after setting up account management
    const fetchData = useCallback(async()=>{
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
        console.log('Total updated to:', items.total);
      } catch (err) {
        console.error(err);
      }
    },[user_id]);

    useEffect(() => {

        fetchData();    
    },[fetchData]);

    const QuantityPlusOne = async (item_id) =>{
          try{
              const params = {
                  "user_id": user_id,
                  "item_id": item_id
              };        

              const response = await fetch('http://localhost:3001/quantity-plus-one',{
                  method: 'POST',
                  headers : {
                      'Content-Type':'application/json'
                  },
                  body : JSON.stringify(params)
              });

           
              
              const result = await response.json();
              console.log(result);
              
              if(response.ok){
                  setPurchased(result.purchased);
                  setSubtotal(result.subtotal);
              } else {
                  if(response.status === 400){
                      alert(`${result.message}`);
                  }
              }
          }catch(err) {console.log(err)}
      }
  

  const QuantityMinusOne = async (item_id) =>{
    
        try{
            const params = {
                "user_id": user_id,
                "item_id": item_id
            };        

            const response = await fetch('http://localhost:3001/quantity-minus-one',{
                method: 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(params)
            });

            if (!response.ok) {
                throw new Error('Error updating quantity of shopping cart item');
              }
            
            const result = await response.json();

            setPurchased(result.purchased);
            setSubtotal(result.subtotal);
        }catch(err) {console.log(err)}
    }


    const DeleteFromCart =  async(item_id) =>{
      if(confirm(`Are you sure you want to delete ${product.item.name} from cart? \n(This action is irreversible)`)){
              try{
                  const data = {
                      "user_id": user_id,
                      "item_id": item_id
                  };        

                  const response = await fetch('http://localhost:3001/delete-item',{
                      method: 'DELETE',
                      headers : {
                          'Content-Type':'application/json'
                      },
                      body : JSON.stringify(data)
                  });


                  if (!response.ok) {
                      throw new Error('Error deleting shopping cart item');
                  }
                  
                  await fetchData();
                  
              }catch(err) {console.log(err)}
          }
      }
    

    return (
        <>
            <h1>Shopping Cart</h1>
            {fetched.map((item) => (
                <CartItemCard key={item.item.item_id} product={item} onDelete = {DeleteFromCart} onPlusOne={QuantityPlusOne} onMinusOne={QuantityMinusOne} 
                />
            ))}            
            <div className="text-end" style={{ fontSize: '1.25rem'} }><p>Total Price &#58; &#36;  {total}</p></div>
            <div className="text-end" ><button className="btn btn-info hover">Checkout</button></div>
        </>
    )
}