'use client';

import { useUser } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import toast from 'react-hot-toast';

export interface HeartFavoriteProps {
    product: ProductType;
    isLikedProduct?: boolean;
}

const HeartFavorite: React.FC<HeartFavoriteProps> = ({ product, isLikedProduct }) => {
    const router = useRouter();
    const { user } = useUser();

    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(isLikedProduct);

    const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (!user) {
                router.push('/sign-in');
                return;
            } else {
                const res = await fetch('/api/users/wishlist', {
                    method: 'POST',
                    body: JSON.stringify({ productId: product._id }),
                });
                const updatedUser = await res.json();
                const check = updatedUser.wishlist.includes(product._id);
                setIsLiked(check);
                toast.success(`${check ? '👍 Like' : '👎 Dislike'}`);
            }
        } catch (error: any) {
            console.log('wishlist_POST', error);
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Suspense fallback={<>loading...</>}>
            <button onClick={handleLike}>
                {loading ? (
                    <div className='flex items-center justify-center'>
                        <div className='animate-spin rounded-full border-t-2 border-blue-1 border-solid h-5 w-5'></div>
                    </div>
                ) : (
                    <Heart fill={`${isLiked ? 'red' : 'white'}`} stroke='red' />
                )}
            </button>
        </Suspense>
    );
};

export default HeartFavorite;
