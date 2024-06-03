'use client';

import { StarIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ReviewPosts = ({ productId }: { productId: string }) => {
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex: number) {
        setRating(getCurrentIndex);
    }
    function handleMouseEnter(getCurrentIndex: number) {
        setHover(getCurrentIndex);
    }
    function handleMouseLeave() {
        setHover(rating);
    }

    const handleReview = async () => {
        try {
            if (comment.length < 10) throw new Error('Please enter more words!');
            const res = await fetch(`http://localhost:3000/api/users/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: productId?.toString(),
                    comment: comment,
                    rating: rating,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit review');
            }
            const data = await res.json();
            setComment('');
            setRating(0);
            toast.success('Review Create Successfully');
        } catch (error: any) {
            toast.error(error?.message || 'Internal Server Error');
        }
    };

    return (
        <div className='flex flex-col w-full'>
            <div className='px-12 py-5'>
                <h2 className='text-grey-1 text-3xl font-semibold'>Your opinion matters to us!</h2>
            </div>
            <div className='bg-gray-200 w-full flex flex-col items-center'>
                <div className='flex flex-col items-center py-6 space-y-3'>
                    <span className='text-lg text-grey-1'>How was quality of the call?</span>
                    <div className='flex space-x-3'>
                        {[...Array(5)].map((_, index) => {
                            index += 1;
                            return (
                                <StarIcon
                                    key={index}
                                    className='cursor-pointer'
                                    fill={index <= (hover || rating) ? 'gold' : '#fff'}
                                    onClick={() => handleClick(index)}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                    size={30}
                                    strokeWidth={1}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className='w-full px-4 flex flex-col'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder=' Leave a message, if you want'
                        className='p-4 rounded-xl resize-none'></textarea>
                    <button
                        onClick={() => handleReview()}
                        className='py-3 my-8 text-lg bg-gradient-to-r bg-grey-1 hover:bg-grey-1/80 rounded-xl text-white'>
                        Rate now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPosts;
