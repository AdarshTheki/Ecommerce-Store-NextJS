'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MoveLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useDropdown from '@/utils/useDropdown';
import useFetch from '@/utils/useFetch';

const SearchDropdown = () => {
    const router = useRouter();
    const { isOpen, toggle, dropdownRef } = useDropdown();
    const [query, setQuery] = useState<string>('');
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { data } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/products?sortBy=rating`);

    const fetchData = async (query: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${query}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query) {
                fetchData(query);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    const handleGoProduct = useCallback(
        (id: string) => {
            router.push(`/products/${id}`);
            toggle();
        },
        [router, toggle]
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.length === 0) return;
        router.push(`/search/${query}`);
        setQuery('');
        toggle();
    };

    return (
        <>
            <div className='relative'>
                {/* Search button */}
                <button
                    onClick={toggle}
                    className='flex items-center rounded-full text-base-bold px-2 p-1 border-grey-1 border text-grey-1 hover:bg-grey-1 hover:text-white'>
                    <span>Search...</span>
                    <Search />
                </button>
                {/* Search Dropdown */}
                {isOpen && (
                    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
                        <div
                            ref={dropdownRef}
                            className='rounded-2xl sm:p-4 p-2 overflow-hidden overflow-y-auto shadow-lg w-full h-full sm:h-[80vh] sm:w-[60vw] bg-white'>
                            <form
                                onSubmit={handleSearch}
                                className='flex w-full flex-row items-start justify-between sm:gap-5 bg-white'>
                                <div className='flex w-full flex-row items-center sm:gap-5'>
                                    <span
                                        onClick={toggle}
                                        className='p-2 cursor-pointer rounded-lg hover:bg-gray-200'>
                                        <MoveLeft />
                                    </span>
                                    <input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder='Search for Mattresses, Beds, Sofas, etc'
                                        className='p-2 rounded-full border active:border-blue-1 w-full'
                                    />
                                </div>
                                <button
                                    type='submit'
                                    className='p-2 rounded-lg bg-blue-1 text-white'>
                                    <Search />
                                </button>
                            </form>
                            <div className='text-grey-1 p-2'>
                                {loading ? (
                                    <div className='flex justify-center items-center p-4'>
                                        Loading...
                                    </div>
                                ) : (
                                    products.map((product: ProductType) => (
                                        <div
                                            onClick={() => handleGoProduct(product._id)}
                                            key={product._id}
                                            className='flex gap-3 mb-1 items-center hover:bg-grey-1/20 rounded-lg cursor-pointer'>
                                            <Image
                                                src={product.thumbnail || '/placeholder.jpg'}
                                                alt='coverImage'
                                                width={40}
                                                height={20}
                                                className='object-contain'
                                            />
                                            <small>
                                                {product.title},{' '}
                                                <strong className=' hidden sm:block'>
                                                    {product.category}
                                                </strong>
                                            </small>
                                        </div>
                                    ))
                                )}
                                <p className='py-5 text-base-bold'>Popular Products</p>
                                <div className='grid md:grid-cols-3 grid-cols-2 gap-2'>
                                    {data &&
                                        data?.products?.map((product: ProductType) => (
                                            <div
                                                onClick={() => handleGoProduct(product._id)}
                                                key={product._id}
                                                className='sm:flex gap-1 md:scale-100 scale-70 mb-1 items-center hover:bg-grey-1/20 rounded-lg cursor-pointer'>
                                                <Image
                                                    src={product.thumbnail || '/placeholder.jpg'}
                                                    alt='coverImage'
                                                    width={100}
                                                    height={50}
                                                    className='object-contain'
                                                />
                                                <div className='text-grey-1 flex flex-col'>
                                                    <span className='text-small-bold'>
                                                        {product?.title}
                                                    </span>
                                                    <small>{product?.category}</small>
                                                    <small>
                                                        Price:{' '}
                                                        {product?.price?.toLocaleString('en-US', {
                                                            maximumFractionDigits: 0,
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        })}
                                                    </small>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchDropdown;
