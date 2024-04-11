import { useState, useEffect } from 'react';
import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';
import { useNavigate } from 'react-router-dom';

export default function MainProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  // ===Check if user is logged in=============================

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null
  }

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

  useEffect(() => {
    // Check if user is logged in
    if (!checkLoggedIn()) {
      setIsLoggedIn(false); 
    } else {
      setIsLoggedIn(true); 
    }

    fetch('http://localhost:3001/all-products')
        .then(response => response.json())
        .then(data => setData(data))
  }, []);

  // ========================================================

  return (
    <>
      <Headbar setSearchTerm={setSearchTerm}  isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: '160px' }}> {/* Margin needed to offset */}
      <Title value="Browse products" fontWeight={900} />
      <div style={{ 
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24
      }}>
        {
          data.map(product => {
            return (
              <ProductCard 
                key={product.item_id}
                name={product.name} 
                img={product.url} 
                company={product.vendor}
                price={product.price}
                rating={product.rating}
                ratingCount={product.rating_count}
                itemId={product.item_id}
              />
            )
          })
        }
      </div>
      </div>
    </>
  )
}