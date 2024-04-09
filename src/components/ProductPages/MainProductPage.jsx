import {useState,useEffect } from 'react';
import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';
import { Link } from 'react-router-dom';
export default  function MainProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fetched, setFetched] = useState([]);

  useEffect(()=>{ 
    async function fetchData(){
      const data = {
        "searchTerm": searchTerm
      };

      try{
        const response = await fetch("http://localhost:3001/all-items", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();
        setFetched(result);
      
      }catch(err){
        console.log(err);
      }

    }

  
  fetchData(); 
       },[searchTerm]);

  return (
    <>
      <Headbar setSearchTerm={setSearchTerm} />
      <div style={{ marginTop: '160px' }}> {/* Margin needed to offset */}
      <Title value="Browse products" fontWeight={900} />
      <div style={{ 
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 24
      }}>
      {
        fetched.map((item) => {
          return (
            <Link key={item.item_id} to={`/PerProductPage/${item.item_id}`}>
              <ProductCard
                key={item.item_id}
                name={item.name}
                img={item.url}
                company={item.vendor}
                price={item.price}
                rating={item.average_rating}
                ratingCount={item.number_of_reviews}
              />
            </Link>
          );
        })
      }
        
      </div>
      </div>
    </>
  )
}