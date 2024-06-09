'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { CircleUserRound, Menu, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import SearchDropdown from './SearchDropdown';
import useCart from '@/lib/useCart';
import useDropdown from '@/utils/useDropdown';

const NavBar = () => {
    const { user } = useUser();
    const cart = useCart();
    const pathname = usePathname();
    const { isOpen, toggle, dropdownRef } = useDropdown();

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2'>
            {/* Left Section */}
            <Link href='/'>
                <Image src='/logo.png' alt='logo' width={130} height={100} />
            </Link>

            {/* Center Section as Navigation Links Section */}
            <div className='flex gap-4 text-base-bold max-lg:hidden'>
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
                <SearchDropdown />

                {/* Shopping Cart */}
                <Link
                    href='/cart'
                    className='flex items-center gap-3 border border-grey-1 rounded-full px-4 py-1 hover:bg-grey-1 hover:text-white max-md:hidden'>
                    <ShoppingCart />
                    <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                </Link>

                {/* Menu Open with 600px width  */}
                <div className=' relative' ref={dropdownRef}>
                    <Menu className='cursor-pointer lg:hidden' onClick={toggle} />
                    {user && isOpen && (
                        <div className='absolute w-fit -right-2 top-9 bg-white border shadow-2xl rounded-lg flex-col lg:hidden'>
                            <div className='flex flex-col gap-4 p-5'>
                                <Link href='/' className='hover:text-red-1'>
                                    Home
                                </Link>
                                <Link href='/products' className='hover:text-red-1'>
                                    Products
                                </Link>
                                <Link
                                    href={user?.emailAddresses ? '/wishlist' : '/sign-in'}
                                    className='hover:text-red-1'>
                                    Wishlist
                                </Link>
                                <Link
                                    href={user?.emailAddresses ? '/orders' : '/sign-in'}
                                    className='hover:text-red-1'>
                                    Orders
                                </Link>
                                <Link href={'/contact'} className='hover:text-red-1'>
                                    Contact
                                </Link>
                                <Link
                                    href='/cart'
                                    className='flex whitespace-nowrap items-center gap-3 border rounded-full px-4 py-1 hover:bg-grey-1 hover:text-white'>
                                    <ShoppingCart />
                                    <p className='text-base-bold'>Cart ({cart.cartItems.length})</p>
                                </Link>
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
