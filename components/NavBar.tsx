'use client';

import useCart from '@/lib/useCart';
import { UserButton, useUser } from '@clerk/nextjs';
import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const NavBar = () => {
    const { user } = useUser();
    const router = useRouter();
    const cart = useCart();
    const pathname = usePathname();

    const [dropdownMenu, setDropdownMenu] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2'>
            <Link href='/' className='border'>
                <Image src='/logo.png' alt='logo' width={130} height={100} />
            </Link>

            {/* Navigation Links Section */}
            <div className='flex gap-4 text-base-bold max-lg:hidden'>
                <Link href='/' className={`hover:text-red-1 ${pathname === '/' && 'text-red-1'}`}>
                    Home
                </Link>
                <Link
                    href={user ? '/wishlist' : '/sign-in'}
                    className={`hover:text-red-1 ${pathname === '/wishlist' && 'text-red-1'}`}>
                    Wishlist
                </Link>
                <Link
                    href={user ? '/orders' : '/sign-in'}
                    className={`hover:text-red-1 ${pathname === '/orders' && 'text-red-1'}`}>
                    Orders
                </Link>
            </div>

            {/* Search section */}
            <div className='sm:flex gap-3 border border-grey-3 py-1.5 px-4 items-center rounded-lg hidden'>
                <input
                    className='outline-none max-sm:max-w-[120px] text-small-medium text-grey-1'
                    placeholder='Search...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button disabled={query === ''} onClick={() => router.push(`/search/${query}`)}>
                    <Search className='cursor-pointer hover:text-red-1 text-grey-1' />
                </button>
            </div>

            {/* Add to Cart Section */}
            <div className='relative flex items-center gap-5'>
                <Link
                    href='/cart'
                    className='flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-grey-1 hover:text-white max-md:hidden'>
                    <ShoppingCart />
                    <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                </Link>

                {/* Menu Dropdown Section */}
                <Menu
                    className='cursor-pointer lg:hidden'
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {user && dropdownMenu && (
                    <div className='absolute top-12 right-5 flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden'>
                        <Link href='/' className='hover:text-red-1'>
                            Home
                        </Link>
                        <Link href={user ? '/wishlist' : '/sign-in'} className='hover:text-red-1'>
                            Wishlist
                        </Link>
                        <Link href={user ? '/orders' : '/sign-in'} className='hover:text-red-1'>
                            Orders
                        </Link>
                        <Link
                            href='/cart'
                            className='flex whitespace-nowrap items-center gap-3 border rounded-lg px-2 py-1 hover:bg-grey-1 hover:text-white'>
                            <ShoppingCart />
                            <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                        </Link>
                        <div className='flex sm:hidden gap-3 border border-grey-3 py-1.5 px-4 items-center rounded-lg'>
                            <input
                                className='outline-none max-sm:max-w-[120px] text-small-medium text-grey-1'
                                placeholder='Search...'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                disabled={query === ''}
                                onClick={() => router.push(`/search/${query}`)}>
                                <Search className='cursor-pointer hover:text-red-1 text-grey-1' />
                            </button>
                        </div>
                    </div>
                )}

                {/* User Section */}
                {user?.emailAddresses ? (
                    <UserButton afterSignOutUrl='/sign-in' />
                ) : (
                    <Link href={'/sign-in'}>
                        <CircleUserRound />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
