import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState([])

  const { category } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3001/category/${category}`)
        .then(response => response.json())
        .then(data => setData(data))
  }, [category]);

  return (
    <>
      <Headbar setSearchTerm={setSearchTerm} />
      <div style={{ marginTop: '160px' }}> {/* Margin needed to offset */}
      <Title value={`Browse ${category}`} fontWeight={900} />
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
      {data.length === 0 && <div style={{ marginTop: 100 }}>Sorry, there are no products available for this category.</div>}
      </div>
    </>
  )
}