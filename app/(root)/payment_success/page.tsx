'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useCart from '@/lib/useCart';
import Link from 'next/link';

const PaymentSuccess = () => {
    const cart = useCart();

    useEffect(() => {
        cart.clearCart();
    }, []);

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <p className='text-heading4-bold text-red-1'>Successful Payment</p>
            <p>Thank you for your purchase</p>
            <Link href='/' className='p-4 border text-base-bold hover:bg-grey-1 hover:text-white'>
                CONTINUE TO SHOPPING
            </Link>
        </div>
    );
};

export default PaymentSuccess;
