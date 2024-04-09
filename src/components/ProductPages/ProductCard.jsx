import { colors } from '../../styles/palette'

import Title from "../../assets/Title"
import StarRatings from './StarRatings'

export default function ProductCard(props) {
  const {
    img,
    name, 
    company, 
    rating, 
    ratingCount,
    price,
    currency='USD'
  } = props

  let dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      background: colors.backgroundPink,
      border: `1px solid ${colors.borderGrey}`,
      padding: 12
      }}>
      <div style={{ 
        width: 300, 
        height: 300, 
        backgroundImage: `url(${img})`, 
        backgroundSize: 'contain', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }} />
      <div style={{ marginTop: 8 }}>
        <Title value={name} />
      </div>
      <Title value={company} fontSize='16px' />
      <div style={{ display: 'flex', gap: 4 }}>
        <StarRatings rating={rating} />
        ({ratingCount})
      </div>
      <div style={{ marginTop: 8 }}>
        <Title value={dollarFormatter.format(price)} />
      </div>
    </div>
  )
}
