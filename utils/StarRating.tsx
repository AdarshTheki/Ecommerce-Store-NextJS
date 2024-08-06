import { Star } from 'lucide-react';
import React from 'react';

interface StarRatingProps {
    totalStars: number;
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, rating }) => {
    return (
        <div className='flex items-center justify-center gap-1'>
            {[...Array(totalStars)].map((_, index) => (
                <Star
                    key={index}
                    size={20}
                    fill={rating > index ? '#ff9500' : '#FFF'}
                    color='#ff9500'
                />
            ))}
        </div>
    );
};
export default StarRating;
