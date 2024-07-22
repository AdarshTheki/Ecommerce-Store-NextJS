'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import SearchSection from './SearchSection';
import useCart from '@/lib/useCart';
import useDropdown from '@/utils/useDropdown';
import LogoSvg from './LogoSvg';

const NavBar = () => {
    const { user } = useUser();
    const cart = useCart();
    const pathname = usePathname();
    const { isOpen, toggle, dropdownRef } = useDropdown();

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 text-base-medium text-gray-700 justify-between items-center bg-white max-sm:px-2'>
            {/* Left Section */}
            <Link href='/'>
                <LogoSvg />
            </Link>

            {/* Center Section as Navigation Links Section */}
            <div className='flex gap-4 max-lg:hidden'>
                <Link href='/' className={`hover:text-red-1 ${pathname === '/' && 'text-red-1'}`}>
                    Home
                </Link>
                <Link
                    href='/products'
                    className={`hover:text-red-1 ${pathname === '/products' && 'text-red-1'}`}>
                    Products
                </Link>
                <Link
                    href={user?.emailAddresses ? '/wishlist' : '/sign-in'}
                    className={`hover:text-red-1 ${pathname === '/wishlist' && 'text-red-1'}`}>
                    Wishlist
                </Link>
                <Link
                    href={user?.emailAddresses ? '/orders' : '/sign-in'}
                    className={`hover:text-red-1 ${pathname === '/orders' && 'text-red-1'}`}>
                    Orders
                </Link>
                <Link
                    href={'/contact'}
                    className={`hover:text-red-1 ${pathname === '/contact' && 'text-red-1'}`}>
                    Contact
                </Link>
            </div>

            {/* Right Section */}
            <div className='relative flex items-center gap-5'>
                {/* Search Products */}
                <SearchSection />

                {/* Shopping Cart */}
                <Link href='/cart' className='flex items-center gap-2 max-md:hidden'>
                    <ShoppingCart />
                    <p className='text-base-bold'>
                        Cart
                        <sup className='bg-gray-900 rounded-full text-white font-bold px-1 py-0'>
                            {cart.cartItems.length}
                        </sup>
                    </p>
                </Link>

                {/* Menu Open with 600px width  */}
                <div className='relative'>
                    <Menu className='cursor-pointer lg:hidden' onClick={toggle} />
                    {isOpen && (
                        <div ref={dropdownRef}>
                            <div className='absolute -right-2 top-9 bg-white border shadow-2xl rounded-lg flex-col lg:hidden'>
                                <div
                                    className='flex flex-col text-center w-[200px]'
                                    onClick={toggle}>
                                    <Link
                                        href='/'
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Home
                                    </Link>
                                    <Link
                                        href='/products'
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Products
                                    </Link>
                                    <Link
                                        href={user?.emailAddresses ? '/wishlist' : '/sign-in'}
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Wishlist
                                    </Link>
                                    <Link
                                        href={user?.emailAddresses ? '/orders' : '/sign-in'}
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Orders
                                    </Link>
                                    <Link
                                        href={'/contact'}
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Contact
                                    </Link>
                                    <Link
                                        href='/cart'
                                        className='hover:text-red-1 hover:bg-gray-200 py-2'>
                                        Cart
                                        <sup className='bg-gray-900 rounded-full text-white font-bold px-1 py-0'>
                                            {cart.cartItems.length}
                                        </sup>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* User Section */}
                <div>
                    {user?.emailAddresses ? (
                        <UserButton afterSignOutUrl='/sign-in' />
                    ) : (
                        <Link href={'/sign-in'}>
                            <CircleUserRound />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
