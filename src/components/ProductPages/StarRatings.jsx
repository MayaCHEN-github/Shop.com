import { Rating, ThinStar } from '@smastrom/react-rating'

const ratingStyle = {
  itemShapes: ThinStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

export default function StarRatings({ rating }) {
  return (
    <Rating readOnly style={{ maxWidth: 100 }} value={rating} itemStyles={ratingStyle} />
  )
}
