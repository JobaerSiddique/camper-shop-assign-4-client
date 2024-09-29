import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

export const Rating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }

  // Half star if necessary
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }

  // Empty stars (if needed)
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} style={{ opacity: 0.3 }} />);
  }

  return (
    <div>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};
