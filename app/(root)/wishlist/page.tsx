'use client';

import Loader from '@/utils/Loader';
import ProductCard from '@/components/ProductCard';
import { getProductDetails } from '@/lib/actions';
import React, { useEffect, useState } from 'react';
import useFetch from '@/utils/useFetch';

const WishList = () => {
    const [loading, setLoading] = useState(true);
    const [wishlist, setWishlist] = useState<ProductType[]>([]);
    const { data } = useFetch('/api/users');

    useEffect(() => {
        const getWishlistProducts = async () => {
            setLoading(true);
            if (!data) return;
            const wishlistProducts = await Promise.all(
                data?.wishlist.map(async (productId: string) => {
                    const res = await getProductDetails(productId);
                    return res;
                })
            );
            setWishlist(wishlistProducts);
            setLoading(false);
        };

        if (data) {
            getWishlistProducts();
        }
    }, [data]);

    if (loading) return <Loader />;

    return (
        <div className='sm:px-10 px-4 py-5'>
            <p className='text-heading3-bold my-10'>Your Wishlist</p>
            {wishlist.length === 0 && <p>No items in your wishlist</p>}

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 '>
                {wishlist.map((product) => (
                    <ProductCard key={product._id} product={product} isLikedProduct={true} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default WishList;
