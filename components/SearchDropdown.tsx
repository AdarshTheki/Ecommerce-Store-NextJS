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
                    <div className='fixed max-w-96 w-full right-5 top-14 bottom-14 bg-white border shadow-2xl rounded-lg flex-col'>
                        <div className='h-full overflow-y-scroll'>
                            <div className='sticky p-4 bg-white top-0 flex gap-2 items-center'>
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
                                    .map((product: ProductType) => {
                                        const url =
                                            typeof product.media === 'string'
                                                ? product.media
                                                : product.media[0];
                                        return (
                                            <div
                                                onClick={() => handleGoProduct(product._id)}
                                                key={product._id}
                                                className='flex gap-3 items-center hover:bg-grey-1/20 p-2 rounded-lg cursor-pointer'>
                                                <Image
                                                    src={url || '/placeholder.jpg'}
                                                    alt='coverImage'
                                                    width={40}
                                                    height={20}
                                                    className='object-contain'
                                                />
                                                <p className='text-small-bold'>
                                                    {product.title},{' '}
                                                    <strong>{product.category}</strong>
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchDropdown;
