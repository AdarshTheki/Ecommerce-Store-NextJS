import { ShareIcon, StarIcon } from 'lucide-react';
import React from 'react';

interface ReviewProps {
    _id: string;
    userId: string;
    rating: number;
    comment: string;
}

const ReviewCard = ({ review }: { review: ReviewProps[] }) => {
    return (
        <>
            <div className='flex flex-col gap-4 p-4'>
                <div className='flex justify justify-between'>
                    <div className='flex gap-2'>
                        <span className='w-7 h-7 text-center rounded-full bg-yellow-500'>A</span>
                        <span>Alice Banks</span>
                    </div>
                    <div className='flex p-1 gap-1 items-center text-base-bold'>
                        <StarIcon fill='gold' /> 4
                    </div>
                </div>
                <p className=' text-small-medium'>
                    Soft rounded corners make With a focus on both the pros and cons of each model,
                    these reviews aim to assist potential buyers in selecting the best that suits
                    their needs and preferences. it a pleasure to look at.
                </p>
                <div className='flex justify-between'>
                    <span>Feb 13, 2021</span>
                    <button className='flex p-1 rounded items-center bg-grey-1 hover:bg-grey-1/80 text-white'>
                        <ShareIcon /> Share
                    </button>
                </div>
            </div>
            {review.map((item: ReviewProps, index) => (
                <div key={item._id} className='flex flex-col gap-4 mt-4 p-4'>
                    <div className='flex justify justify-between'>
                        <div className='flex gap-2'>
                            <span className='w-7 h-7 text-center rounded-full bg-yellow-500'>
                                {index + 1}
                            </span>
                            <span>{item.userId.slice(0, 15) || 'Alice Banks'}</span>
                        </div>
                        <div className='flex p-1 gap-1 items-center text-base-bold'>
                            <StarIcon fill='gold' /> {item.rating}
                        </div>
                    </div>
                    <p className=' text-small-medium'>
                        {item.comment || 'Soft rounded corners make it a pleasure to look at.'}
                    </p>
                    <div className='flex justify-between'>
                        <span>
                            {new Date(Date.now() - index * 1000 * 60 * 300).toLocaleString()}
                        </span>
                        <button className='flex p-1 rounded items-center bg-grey-1 hover:bg-grey-1/80 text-white'>
                            <ShareIcon /> <span>Share</span>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ReviewCard;
