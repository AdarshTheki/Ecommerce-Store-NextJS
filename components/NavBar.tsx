'use client';

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    CircleUserRound,
    Menu,
    ShoppingCart,
    Home,
    ShoppingBasket,
    Heart,
    Contact,
    FileClock,
    MessageCircle,
} from 'lucide-react';

import SearchSection from './SearchSection';
import useCart from '@/lib/useCart';
import useDropdown from '@/utils/useDropdown';
import LogoSvg from '../utils/LogoSvg';

const NavBar = () => {
    const { user } = useUser();
    const cart = useCart();
    const pathname = usePathname();
    const { isOpen, toggle, dropdownRef } = useDropdown();

    return (
        <div className='sticky top-0 z-10 py-2 px-10 flex gap-2 text-base-medium text-gray-700 justify-between items-center bg-white max-sm:px-2'>
            <Link href='/'>
                <LogoSvg />
            </Link>

            {/* Right Section */}
            <div className='flex items-center sm:gap-5 gap-2'>
                <SearchSection />

                <Menu className='cursor-pointer' onClick={toggle} />
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className='absolute text-base-medium w-[80vw] max-w-[400px] overflow-hidden sm:right-10 right-5 top-12 bg-white border shadow-2xl rounded-2xl'>
                        <div className='flex z-50 flex-col'>
                            {/* <Link
                                        href={user?.emailAddresses ? '/wishlist' : '/sign-in'}
                                        className='hover:text-red-1 hover:bg-gray-200 p-5'>
                                        Wishlist
                                    </Link> */}
                            {navLinks.map((link) => {
                                return (
                                    <Link
                                        onClick={toggle}
                                        href={
                                            ['wishlist', 'orders', 'cart', 'comment'].includes(
                                                link.name
                                            )
                                                ? user?.emailAddresses
                                                    ? link.href
                                                    : '/sign-in'
                                                : link.href
                                        }
                                        key={link.name}
                                        className='hover:text-red-1 flex items-center gap-4 hover:bg-gray-200 capitalize py-3 border-b'>
                                        <span className='pl-10'>{link.icon}</span>
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

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

const navLinks = [
    { href: '/', icon: <Home />, name: 'home' },
    { href: '/products', icon: <ShoppingBasket />, name: 'products' },
    { href: '/contact', icon: <Contact />, name: 'contact' },
    { href: '/cart', icon: <ShoppingCart />, name: 'cart' },
    { href: '/wishlist', icon: <Heart />, name: 'wishlist' },
    { href: '/orders', icon: <FileClock />, name: 'orders' },
    { href: '/reviews', icon: <MessageCircle />, name: 'comment' },
];
