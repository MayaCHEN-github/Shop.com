import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/palette'

import Headbar from './HeadBarProduct'
import Title from "../../assets/Title"
import StarRatings from './StarRatings'
import DescriptionBullets from './DescriptionBullets'

export default function PerProductPage(props) {
  const MAX_QTY=20000

  
  const tmpValuesToBeDataflow = {
    productName: "iPhone 15",
    company: "Apple Inc.",
    imgUrl: "https://m.media-amazon.com/images/I/51PtFHUPjBL._AC_SL1000_.jpg",
    price: 1399,
    description: "6.1inch Super Retina XDR display. Aluminum with color-infused glass back. Ring/Silent switch\nDynamic Island. A magical way to interact with iPhone. A16 Bionic chip with 5-core GPU\nAdvanced dual-camera system. 48MP Main | Ultra Wide.  Super-high-resolution photos (24MP and 48MP). Next-generation portraits  with Focus and Depth Control. 4X optical zoom range\nEmergency SOS via satellite. Crash Detection. Roadside Assistance via satellite\nUp to 26 hours video playback. USB C, Supports USB 2. Face ID",
    rating: 4,
    ratingCount: 123,
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [qty, setQty] = useState(1)
  const [addToCartDisabled, setAddToCartDisabled] = useState(true)

  useEffect(() => {
    if (Number(qty) > 0) {
      setAddToCartDisabled(false)
    } else {
      setAddToCartDisabled(true)
    }
  }, [qty])

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
            <img src={tmpValuesToBeDataflow.imgUrl} width="400px"/>
          </div>
          <div style={{ padding: '0 24px', width: '100%', textAlign: 'left' }}> 
            <Title value={tmpValuesToBeDataflow.productName} fontSize={"36px"}/>
            <Title value={tmpValuesToBeDataflow.company} fontSize={"20px"}/>
            <div style={{ display: 'flex', gap: 4 }}>
              <StarRatings rating={tmpValuesToBeDataflow.rating} />
              ({tmpValuesToBeDataflow.ratingCount})
            </div>
            <div style={{ height: 1, backgroundColor: 'black', margin: '16px 0' }}/>
            <DescriptionBullets value={tmpValuesToBeDataflow.description}/>
            <Title value={dollarFormatter.format(Number(tmpValuesToBeDataflow.price) * qty)} fontSize={"32px"} />
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
              />
            </div>
          </div>
        </div>
      </div>
       
    </>
  )
}