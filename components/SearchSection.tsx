'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MoveLeft, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useDropdown from '@/utils/useDropdown';
import useFetch from '@/utils/useFetch';

const SearchSection = () => {
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
        }, 1000);

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
                <button onClick={toggle} className='flex items-center text-base-bold p-1'>
                    <Search />
                    <span className='hidden sm:block'>Search...</span>
                </button>
                {/* Search Dropdown */}
                {isOpen && (
                    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40'>
                        <div
                            ref={dropdownRef}
                            className='rounded-2xl overflow-hidden shadow-lg w-full h-[90%] max-w-[800px] bg-gray-100'>
                            <form
                                onSubmit={handleSearch}
                                className='flex z-10 sticky top-0 w-full flex-row items-start justify-between gap-5 bg-white p-2'>
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
                            <div className='overflow-y-scroll h-full pb-5'>
                                {loading ? (
                                    <div className='flex justify-center items-center p-4'>
                                        Loading...
                                    </div>
                                ) : (
                                    query &&
                                    products.map((product: ProductType) => (
                                        <div
                                            onClick={() => handleGoProduct(product._id)}
                                            key={product._id}
                                            className='flex gap-4 items-center px-4 hover:bg-grey-1/20 cursor-pointer'>
                                            <Image
                                                src={product.thumbnail || '/placeholder.jpg'}
                                                alt='coverImage'
                                                width={40}
                                                height={20}
                                                className='object-contain'
                                            />
                                            <p>{product.title}</p>
                                        </div>
                                    ))
                                )}
                                <p className='p-4 text-base-bold '>Popular Products</p>
                                <div className='px-4 grid md:grid-cols-3 grid-cols-2 gap-2'>
                                    {data &&
                                        data?.products?.map((product: ProductType) => (
                                            <div
                                                onClick={() => handleGoProduct(product._id)}
                                                key={product._id}
                                                className='sm:flex gap-2 md:scale-100 scale-70 items-center hover:bg-grey-1/20 cursor-pointer'>
                                                <Image
                                                    src={product.thumbnail || '/placeholder.jpg'}
                                                    alt='coverImage'
                                                    width={60}
                                                    height={30}
                                                    className='object-contain'
                                                />
                                                <div className='text-grey-1 p-2 flex flex-col'>
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

export default SearchSection;
