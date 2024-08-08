'use client';

import { useUser } from '@clerk/nextjs';
import { EllipsisVertical, StarIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import StarRating from '../utils/StarRating';

interface ReviewCardProp {
    reviews: ReviewType[];
    productId?: string;
}

const ReviewCard: React.FC<ReviewCardProp> = ({ reviews, productId }) => {
    const [edit, setEdit] = useState(false);

    return (
        <div className='space-y-5'>
            <h2 className='text-heading3-bold text-center'>Your opinion matters to us!</h2>
            {productId ? (
                edit ? (
                    <ReviewForm productId={productId} onClose={() => setEdit(false)} />
                ) : (
                    <button
                        onClick={() => setEdit(true)}
                        className='w-[200px] mx-auto hover:opacity-80 bg-grey-1 text-white p-2 rounded-lg'>
                        Write Review
                    </button>
                )
            ) : null}

            {reviews?.map((item: ReviewType) => (
                <Card key={item._id} {...item} />
            ))}
        </div>
    );
};
export default ReviewCard;

const Card: React.FC<ReviewType> = ({ ...item }) => {
    const { user } = useUser();
    const [edit, setEdit] = useState(false);

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/users/review/${item._id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Review Deleted');
            }
        } catch (err: any) {
            console.log(err.message);
            toast.error(err.message || 'something was wrong');
        }
    };

    if (edit)
        return (
            <ReviewForm
                _id={item._id}
                comment={item.comment}
                rating={item.rating}
                onClose={() => setEdit(false)}
            />
        );

    return (
        <div className='p-4 bg-white rounded-lg space-y-2 border' key={item._id}>
            <div className='flex gap-2 items-center relative'>
                <div className='flex gap-4 items-center'>
                    <div className='h-14 w-14 flex text-base-medium items-center justify-center rounded-full bg-gray-200'>
                        {item.userDetails?.name.slice(0, 1)}
                    </div>
                    <div>
                        <p className='text-base-medium'>
                            {item.userDetails?.name || 'Alice Banks'}
                        </p>
                        <StarRating rating={item.rating} totalStars={5} />
                    </div>
                </div>
                {user?.fullName == item.userDetails?.name && (
                    <div className='absolute right-2 top-2 cursor-pointer'>
                        <div className='relative group'>
                            <EllipsisVertical fill='#fff' color='#000' />
                            <div className='absolute hidden z-20 group-hover:block right-0 transform w-fit bg-white border border-gray-300 rounded-lg shadow-lg'>
                                <button
                                    onClick={handleDelete}
                                    className='w-full px-5 py-2 hover:bg-gray-300'>
                                    Delete
                                </button>
                                <button
                                    onClick={() => setEdit(true)}
                                    className='w-full px-5 py-2 hover:bg-gray-300'>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <p className='text-small-medium'>
                {item?.comment || 'Soft rounded corners make it a pleasure to look at.'}
            </p>
            <p>{item.updatedAt.toLocaleString()}</p>
        </div>
    );
};

interface FormProps {
    onClose: () => void;
    _id?: string;
    rating?: number;
    comment?: string;
    productId?: string;
}

const ReviewForm: React.FC<FormProps> = ({ onClose, _id, comment, productId, rating }) => {
    const [review, setReview] = useState({
        comments: comment || '',
        ratings: rating || 0,
    });

    const handleSubmit = async () => {
        try {
            if (_id) {
                const res = await fetch(`/api/users/review/${_id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        comment: review.comments,
                        rating: review.ratings,
                    }),
                });
                if (res.ok) {
                    toast.success('Review is Updated');
                }
            } else {
                const res = await fetch(`/api/users/review/${productId}`, {
                    method: 'POST',
                    body: JSON.stringify({
                        comment: review.comments,
                        rating: review.ratings,
                    }),
                });
                if (res.ok) {
                    toast.success('Review is Create');
                }
            }
            setReview({ comments: '', ratings: 0 });
            onClose();
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || 'Internal Server Error');
        }
    };

    return (
        <div className='fixed h-full -top-5 inset-0 z-20 bg-black bg-opacity-30 flex items-center justify-center'>
            <div className='p-4 w-[400px] bg-white rounded-lg space-y-2 border'>
                <div className='flex flex-col items-center gap-10'>
                    <span className='text-lg text-grey-1'>How was quality of the call?</span>
                    <div className='flex space-x-3'>
                        {[...Array(5)].map((_, index) => {
                            index += 1;
                            return (
                                <StarIcon
                                    key={index}
                                    className='cursor-pointer'
                                    fill={index <= review.ratings ? 'gold' : '#fff'}
                                    onClick={() => setReview({ ...review, ratings: index })}
                                    size={30}
                                    strokeWidth={1}
                                />
                            );
                        })}
                    </div>
                    <textarea
                        value={review.comments}
                        onChange={(e) => setReview({ ...review, comments: e.target.value })}
                        rows={4}
                        placeholder=' Leave a message, if you want'
                        className='p-4 rounded-xl resize-none bg-gray-200 max-w-[400px] w-full mx-auto'
                        maxLength={300}></textarea>
                    <div className='w-fit mx-auto'>
                        <button
                            onClick={handleSubmit}
                            className='py-2 px-4 sm:mr-6 mr-2 mb-2 text-lg bg-gradient-to-r bg-grey-1 border border-grey-1 hover:bg-grey-1/80 rounded-xl text-white'>
                            Rate now
                        </button>
                        <button
                            onClick={onClose}
                            className='py-2 px-4 text-lg bg-gradient-to-r border-grey-1 hover:bg-gray-100 border rounded-xl'>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
