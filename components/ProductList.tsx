'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

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
        <div className='py-8 text-grey-1 px-4'>
            <div className='sm:flex justify-between items-center'>
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
            <hr className=' border-b border-gray-400 my-5' />
            {loading && <h2 className='py-10 text-body-bold text-center'>Loading...</h2>}
            {!product || product?.products.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No products found</p>
            ) : (
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
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
                totalProducts={product?.totals}
                onPageChange={handleSetSkip}
            />
        </div>
    );
};

export default ProductList;

interface PaginationProps {
    limit: number;
    skip: number;
    totalProducts: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, skip, totalProducts, onPageChange }) => {
    const totalPages = Math.ceil(totalProducts / limit);
    const currentPage = Math.floor(skip / limit) + 1;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange((currentPage - 2) * limit);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage * limit);
        }
    };

    const handlePageClick = (pageNumber) => {
        onPageChange((pageNumber - 1) * limit);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}>
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className='flex items-center justify-center space-x-2 gap-1 flex-wrap py-5'>
            <button
                onClick={handlePrevious}
                className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300'
                disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                className='px-3 py-1 rounded bg-gray-200 hover:bg-gray-300'
                disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};
