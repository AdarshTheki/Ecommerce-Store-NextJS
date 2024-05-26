'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }: { products: ProductType[] }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUser(data);
        } catch (error: any) {
            console.log(error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return loading ? (
        <p className='text-heading2-bold text-center py-10'>Loading data ! Please wait...</p>
    ) : (
        <div className='flex flex-col items-center gap-10 py-8 px-5 text-grey-1'>
            <p className='text-heading1-bold'>Products</p>
            {!products || products.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No products found</p>
            ) : (
                <div className='flex flex-wrap justify-center gap-16'>
                    {products?.map((product: ProductType) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                            isLikedProduct={user?.wishlist?.includes(product._id) ?? false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;