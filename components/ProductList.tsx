'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Pagination from '@/utils/Pagination';

interface ProductProps {
    products: ProductType[];
    limit: number;
    currentPage: number;
    totalPage: number;
    totalProduct: number;
}
interface UserTypeProps {
    users: UserType;
}

const sortItem = ['title', 'category', 'price', 'discount', 'rating'];

const ProductList = ({ users }: UserTypeProps) => {
    const [data, setData] = useState<ProductProps>();
    const [sortBy, setSortBy] = useState('title');
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductWithQuery = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/products?sortBy=${sortBy}&page=${page}&limit=${limit}`
                );
                const products = await res.json();
                setData(products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductWithQuery();
    }, [sortBy, page, limit]);

    console.log(data);

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

            {loading ? (
                <h2 className='py-10 text-body-bold text-center'>Loading...</h2>
            ) : !data || data?.products.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No products found</p>
            ) : (
                <>
                    <p className='text-center py-4'>
                        (Showing {data?.currentPage * limit - (limit - 1)} –{' '}
                        {data?.currentPage * limit} product of totals {data?.totalProduct} products)
                    </p>

                    {/* pagination */}
                    <section className='flex items-center justify-center flex-wrap gap-2'>
                        {Array.from({ length: data?.totalPage || 4 }, (_, index) => {
                            index += 1;
                            return (
                                <button
                                    onClick={() => setPage(index)}
                                    key={index}
                                    className={`min-w-6 px-3 py-1 rounded-full hover:bg-blue-400 border ${
                                        data?.currentPage === index ? 'bg-blue-600 text-white' : ''
                                    }`}>
                                    {index}
                                </button>
                            );
                        })}
                    </section>

                    <hr className='border-b my-4' />

                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4 px-2'>
                        {data?.products?.map((product: ProductType) => (
                            <ProductCard
                                key={product?._id}
                                product={product}
                                isLikedProduct={
                                    users?.wishlist?.length
                                        ? users?.wishlist?.includes(product._id)
                                        : false
                                }
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
