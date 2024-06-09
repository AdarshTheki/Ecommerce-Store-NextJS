'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useDropdown from '@/utils/useDropdown';

const SearchDropdown = () => {
    const router = useRouter();
    const { isOpen, toggle, dropdownRef } = useDropdown();
    const [query, setQuery] = useState<string>('');
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const handleSearch = useCallback(() => {
        if (query.length === 0) return;
        router.push(`/search/${query}`);
        toggle();
    }, [router, toggle, query]);

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
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
                        <div
                            ref={dropdownRef}
                            className='rounded-2xl overflow-hidden shadow-lg h-auto sm:w-96 w-[90vw] bg-white'>
                            <div className='p-4 bg-gray-100 top-0 flex gap-2 items-center justify-between'>
                                <input
                                    type='text'
                                    className='border border-gray-300 px-4 py-2 rounded-full w-full max-w-60'
                                    placeholder='Search Products...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className='p-2 rounded-lg bg-grey-1 text-white'>
                                    Go
                                </button>
                            </div>
                            <div className='text-grey-1 overflow-y-auto p-2 '>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchDropdown;
