import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  rating: number; // Define the type of the rating prop
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars: JSX.Element[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} />);
  }


  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" />);
  }


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
