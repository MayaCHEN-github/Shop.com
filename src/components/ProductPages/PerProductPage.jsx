import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { colors } from '../../styles/palette'

import Headbar from './HeadBarProduct'
import Title from "../../assets/Title"
import StarRatings from './StarRatings'
import DescriptionBullets from './DescriptionBullets'
import { jwtDecode } from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

export default function PerProductPage(props) {
  const MAX_QTY=20000

  const [searchTerm, setSearchTerm] = useState('')
  const [qty, setQty] = useState(1)
  const [addToCartDisabled, setAddToCartDisabled] = useState(true)
  const navigate = useNavigate(); 
  const { itemId } = useParams()

  const [data, setData] = useState({
    url: "",
    name: "",
    vendor: "",
    rating: "",
    rating_count: "",
    description: "",
    price: "",
  })

  useEffect(() => {
    fetch(`http://localhost:3001/product/${itemId}`)
        .then(response => response.json())
        .then(data => setData(data[0]))
  }, []);

  useEffect(() => {
    if (Number(qty) > 0) {
      setAddToCartDisabled(false)
    } else {
      setAddToCartDisabled(true)
    }
  }, [qty])

  const addToCart = async () => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
      alert('Please login to add items to cart');
      return null
    }
    const decoded_token = jwtDecode(token);
    const user_id = decoded_token.id;

    const data = {
      user_id : user_id,
      purchased : qty,
      item_id: itemId
    }

    const response = await fetch('http://localhost:3001/add-to-cart',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await response.json();

    alert(result.message);

  }

  // TODO: Debt, can be cleared up if currency formatting is required
  const currency = 'USD'
  let dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  return (
    <>
      <Headbar setSearchTerm={setSearchTerm} />
      <div style={{ marginTop: '160px' }}> {/* Margin needed to offset */}
        <div style={{ display: 'flex', flex: '0 auto' }}>
          <div style={{ border: `1px solid ${colors.borderGrey}`, padding: 24 }}>
            <img src={data.url} width="400px"/>
          </div>
          <div style={{ padding: '0 24px', width: '100%', textAlign: 'left' }}> 
            <Title value={data.name} fontSize={"36px"}/>
            <Title value={data.vendor} fontSize={"20px"}/>
            <div style={{ display: 'flex', gap: 4 }}>
              <StarRatings rating={data.rating !== 0 && data.rating_count !== 0 ? data.rating / data.rating_count : 0} />
              ({data.rating_count})
            </div>
            <div style={{ height: 1, backgroundColor: 'black', margin: '16px 0' }}/>
            <DescriptionBullets value={data.description}/>
            <Title value={dollarFormatter.format(Number(data.price) * qty)} fontSize={"32px"} />
            <div style={{ marginTop: 16 }}>
              <input 
                type="number" 
                min="1" 
                max={MAX_QTY} 
                value={qty} 
                onChange={evt => evt.target.value <=  MAX_QTY 
                  ? setQty(evt.target.value) 
                  : setQty(MAX_QTY)}
                placeholder='Quantity'
                style={{ padding: '2px 6px' }}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <input 
                type="button" 
                value="Add to cart" 
                disabled={addToCartDisabled} 
                style={{ backgroundColor: colors.buttonOrange, borderRadius: 10, border: 0, padding: '8px 16px' }}
              
                onClick={()=>addToCart()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}