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
        <div className='w-full'>
            <div className='flex flex-col gap-4 bg-gray-200 p-4'>
                <div className='flex justify justify-between'>
                    <div className='flex gap-2'>
                        <div className='w-7 h-7 text-center rounded-full bg-yellow-500'>A</div>
                        <span>Alice Banks</span>
                    </div>
                    <div className='flex p-1 gap-1 text-orange-300'>{/* start icons */}</div>
                </div>

                <div>
                    Soft rounded corners make With a focus on both the pros and cons of each model,
                    these reviews aim to assist potential buyers in selecting the best that suits
                    their needs and preferences. it a pleasure to look at.
                </div>

                <div className='flex justify-between'>
                    <span>Feb 13, 2021</span>
                    <button className='p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60'>
                        <ShareIcon /> Share
                    </button>
                </div>
            </div>
            {review.map((item: ReviewProps, index) => (
                <div key={item._id} className='flex flex-col gap-4 bg-gray-200 mt-4 p-4'>
                    <div className='flex justify justify-between'>
                        <div className='flex gap-2'>
                            <div className='w-7 h-7 text-center rounded-full bg-yellow-500'>
                                {index + 1}
                            </div>
                            <span>{item.userId.slice(0, 15) || 'Alice Banks'}</span>
                        </div>
                        <div className='flex p-1 gap-1 items-center text-base-bold'>
                            <StarIcon fill='gold' /> {item.rating}
                        </div>
                    </div>

                    <div>
                        {item.comment || 'Soft rounded corners make it a pleasure to look at.'}
                    </div>

                    <div className='flex justify-between'>
                        <span>
                            {new Date(Date.now() - index * 1000 * 60 * 300).toLocaleString()}
                        </span>
                        <button className='flex items-center bg-grey-1 hover:bg-grey-1/80 text-white'>
                            <ShareIcon /> <span>Share</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewCard;
