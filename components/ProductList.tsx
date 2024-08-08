'use client';

import ProductCard from '@/components/ProductCard';
import React, { useEffect, useState } from 'react';

const ProductList = ({ productData }: { productData: ProductType[] }) => {
    const [users, setUsers] = useState<UserType | null>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data) setUsers(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(true);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className='py-10 px-2 w-full'>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                {loading &&
                    productData.map((product) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                            isLikedProduct={users?.wishlist?.includes(product._id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ProductList;
