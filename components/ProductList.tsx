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
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductWithQuery = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}`
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
    }, [limit, skip, sortBy]);

    const handleSetSkip = (page: number) => setSkip(page);

    return (
        <div className='py-8'>
            <div className='sm:flex justify-between px-4 items-center'>
                <div className='flex gap-4 flex-wrap'>
                    <strong>Sort By:</strong>
                    {sortItem.map((i) => (
                        <button
                            key={i}
                            onClick={() => setSortBy(i)}
                            className={`capitalize pb-1 border-b-2 ${
                                sortBy === i ? 'border-blue-800' : 'border-transparent'
                            } `}>
                            {i}
                        </button>
                    ))}
                </div>
                <div className='w-fit'>
                    <select
                        className='w-fit mx-auto border py-1 px-3 rounded-lg mb-1'
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setLimit(Number(e.target.value))
                        }
                        value={limit}>
                        <option value={10}>10 / Page</option>
                        <option value={20}>20 / Page</option>
                        <option value={50}>50 / Page</option>
                    </select>
                    <small className='flex gap-4'>
                        (Showing {skip + 1} – {limit} products of {product?.totals} products)
                    </small>
                </div>
            </div>
            <hr className='border-b border-gray-400 my-5' />
            {loading && <h2 className='py-10 text-body-bold text-center'>Loading...</h2>}
            {!product || product?.products.length === 0 ? (
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
            <Pagination
                limit={limit}
                skip={skip}
                totalProducts={product?.totals || 10}
                onPageChange={handleSetSkip}
            />
        </div>
    );
};

export default ProductList;
