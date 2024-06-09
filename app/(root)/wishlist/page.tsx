'use client';

import Loader from '@/utils/Loader';
import ProductCard from '@/components/ProductCard';
import { getProductDetails } from '@/lib/actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

const WishList = () => {
    const { user } = useUser();

    const [loading, setLoading] = useState(true);
    const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
    const [wishlist, setWishlist] = useState<ProductType[]>([]);

    const getUser = async () => {
        try {
            const res = await fetch(`/api/users`);
            const data = await res.json();
            setSignedInUser(data);
        } catch (err) {
            console.log('[users_GET', err);
        }
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);

    useEffect(() => {
        const getWishlistProducts = async () => {
            setLoading(true);
            if (!signedInUser) return;
            const wishlistProducts = await Promise.all(
                signedInUser.wishlist.map(async (productId) => {
                    const res = await getProductDetails(productId);
                    return res;
                })
            );
            setWishlist(wishlistProducts);
            setLoading(false);
        };

        if (signedInUser) {
            getWishlistProducts();
        }
    }, [signedInUser]);

    return loading ? (
        <Loader />
    ) : (
        <div className='px-10 py-5'>
            <p className='text-heading3-bold my-10'>Your Wishlist</p>
            {wishlist.length === 0 && <p>No items in your wishlist</p>}

            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {wishlist.map((product) => (
                    <ProductCard key={product._id} product={product} isLikedProduct={true} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default WishList;
