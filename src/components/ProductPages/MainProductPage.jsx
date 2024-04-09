import { useState, useEffect } from 'react';
import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';

export default function MainProductPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/all-products')
        .then(response => response.json())
        .then(data => setData(data))
  }, []);

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