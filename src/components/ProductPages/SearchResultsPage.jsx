import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import queryString from 'query-string'

import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';

export default function SearchResultsPage() {
  const location = useLocation()
  const { q } = queryString.parse(location.search)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3001/search?q=${q}`)
      .then(response => response.json())
      .then(data => setData(data))
      .finally(() => setLoading(false))
  }, [q])
  
  return (
    <>
      <Headbar defaultQuery={q} />
      <div style={{ marginTop: '160px' }}> {/* Margin needed to offset */}
      <Title value={`Search results for "${q}"`} fontWeight={900} />
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
      {loading && <div style={{ marginTop: 100 }}>Please wait while we search our database...</div>}
      {!loading && data.length === 0 && <div style={{ marginTop: 100 }}>Sorry, there are no products that match your query.</div>}
      </div>
    </>
  )
}
