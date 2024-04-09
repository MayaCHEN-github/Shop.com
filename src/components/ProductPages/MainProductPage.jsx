import { useState } from 'react';
import Headbar from './HeadBarProduct';
import ProductCard from './ProductCard';
import Title from '../../assets/Title';

export default function MainProductPage() {
  const [searchTerm, setSearchTerm] = useState('');

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
        <ProductCard 
          name={"iPhone 15"} 
          img={"https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg"} 
          company="Apple Inc." 
          price="1399"
          rating="4.3"  
          ratingCount="2367"
        />
        <ProductCard 
          name={"iPhone 15"} 
          img={"https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg"} 
          company="Apple Inc." 
          price="1399"
          rating="4.3"  
          ratingCount="2367"
        />
        <ProductCard 
          name={"iPhone 15"} 
          img={"https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg"} 
          company="Apple Inc." 
          price="1399"
          rating="4.3"  
          ratingCount="2367"
        />
        <ProductCard 
          name={"iPhone 15"} 
          img={"https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg"} 
          company="Apple Inc." 
          price="1399"
          rating="4.3"  
          ratingCount="2367"
        />
        <ProductCard 
          name={"iPhone 15"} 
          img={"https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg"} 
          company="Apple Inc." 
          price="1399"
          rating="4.3"  
          ratingCount="2367"
        />
      </div>
      </div>
    </>
  )
}