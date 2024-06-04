'use client';

import { getProducts } from '@/lib/actions';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const SearchDropdown = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const fetchData = async () => {
        const res = await getProducts();
        setProducts(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = () => {
        router.push(`/search/${query}`);
        toggleDropdown();
    };

    const handleGoProduct = (id: string) => {
        router.push(`/products/${id}`);
        toggleDropdown();
    };

    return (
        <>
            <div className='relative' ref={dropdownRef}>
                {/* Search button */}
                <button
                    onClick={toggleDropdown}
                    className='flex items-center rounded-full text-base-bold px-2 p-1 border-grey-1 border text-grey-1 hover:bg-grey-1 hover:text-white'>
                    <span>Search...</span>
                    <Search />
                </button>
                {/* Search Dropdown */}
                {isOpen && (
                    <div className='fixed z-50 py-5 max-w-[400px] right-4 top-20 bottom-10 bg-white shadow-2xl rounded-lg'>
                        <div className='h-full px-5 overflow-y-scroll'>
                            <div className='flex gap-5 items-center'>
                                <input
                                    type='text'
                                    className='border border-gray-300 px-4 py-2 rounded-full w-full'
                                    placeholder='Search...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button
                                    disabled={query === ''}
                                    onClick={handleSearch}
                                    className='bg-grey-1 hover:bg-grey-1/80 text-white p-2 rounded-full w-[100px]'>
                                    Go
                                </button>
                            </div>
                            <div className='text-grey-1'>
                                {products
                                    .filter(
                                        (item: ProductType) =>
                                            item.title
                                                .toLowerCase()
                                                .includes(query.toLowerCase()) ||
                                            item.category
                                                .toLowerCase()
                                                .includes(query.toLowerCase())
                                    )
                                    .map((product: ProductType) => (
                                        <div
                                            onClick={() => handleGoProduct(product._id)}
                                            key={product._id}
                                            className='flex gap-3 items-center hover:bg-grey-1/20 p-2 rounded-lg cursor-pointer'>
                                            <Image
                                                src={product?.media[0] || '/placeholder.jpg'}
                                                alt='coverImage'
                                                width={40}
                                                height={20}
                                                className='object-contain'
                                            />
                                            <p>
                                                <span className='text-small-medium'>
                                                    {product.title}
                                                </span>
                                                ,
                                                <span className='text-small-bold'>
                                                    {product.category}
                                                </span>
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchDropdown;
