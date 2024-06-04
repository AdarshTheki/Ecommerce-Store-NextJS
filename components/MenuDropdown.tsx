'use client';

import { Menu, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
    cart: any;
    user: any;
}

const MenuDropdown = ({ cart, user }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className=' relative' ref={dropdownRef}>
            <Menu className='cursor-pointer lg:hidden' onClick={toggleDropdown} />
            {user && isOpen && (
                <div className='absolute w-fit -right-2 top-9 bg-white border shadow-2xl rounded-lg flex-col lg:hidden'>
                    <div className='flex flex-col gap-4 p-5'>
                        <Link href='/' className='hover:text-red-1'>
                            Home
                        </Link>
                        <Link href='/products' className='hover:text-red-1'>
                            Products
                        </Link>
                        {/* <Link href={user ? '/wishlist' : '/sign-in'} className='hover:text-red-1'>
                        Wishlist
                    </Link> */}
                        <Link href={user ? '/orders' : '/sign-in'} className='hover:text-red-1'>
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
    );
};

export default MenuDropdown;
