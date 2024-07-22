'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Pagination from '@/utils/Pagination';

interface ProductProps {
    products: ProductType[];
    limit: number;
    skip: number;
    totals: number;
}
interface UserTypeProps {
    users: UserType;
}

const sortItem = ['title', 'category', 'price', 'discount', 'rating'];

const ProductList = ({ users }: UserTypeProps) => {
    const [product, setProduct] = useState<ProductProps>();
    const [sortBy, setSortBy] = useState('title');
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductWithQuery = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=20&skip=${skip}&sortBy=${sortBy}`
                );
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductWithQuery();
    }, [skip, sortBy]);

    const handleSetSkip = (page: number) => setSkip(page);

    return (
        <div className='py-8'>
            <div className='flex flex-wrap sm:gap-6 gap-2 items-center justify-center'>
                {sortItem.map((i) => (
                    <button
                        key={i}
                        onClick={() => setSortBy(i)}
                        className={`capitalize hover:text-blue-1 ${
                            sortBy === i ? 'text-blue-1' : ''
                        } `}>
                        {i}
                    </button>
                ))}
            </div>

            <hr className='border-b my-4' />
            <p className='text-center py-4'>
                (Showing {skip + 1} – 20 products of {product?.totals} products)
            </p>
            <Pagination
                limit={20}
                skip={skip}
                totalProducts={product?.totals || 10}
                onPageChange={handleSetSkip}
            />
            <hr className='border-b my-5' />
            {loading ? (
                <h2 className='py-10 text-body-bold text-center'>Loading...</h2>
            ) : !product || product?.products.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No products found</p>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 px-2'>
                    {product?.products?.map((product) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                            isLikedProduct={
                                users?.wishlist?.length
                                    ? users?.wishlist?.includes(product?._id)
                                    : false
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
