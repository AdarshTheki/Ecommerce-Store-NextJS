'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';

import useCart from '@/lib/useCart';

const CartPage = () => {
    const router = useRouter();
    const cart = useCart();
    const { user } = useUser();

    const total = cart.cartItems.reduce(
        (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
        0
    );
    const totalRounded = parseFloat(total.toFixed(2));

    const customer = {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user?.fullName,
    };

    const handleCheckout = async () => {
        try {
            if (!user) {
                router.push('sign-in');
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                    method: 'POST',
                    body: JSON.stringify({ cartItems: cart.cartItems, customer }),
                });
                const data = await res.json();
                window.location.href = data.url;
                // console.log(data);
            }
        } catch (error) {
            console.log('[checkout_POST]', error);
        }
    };

    return (
        <div className='flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3 text-grey-1'>
            <div className='w-2/3 max-lg:w-full'>
                <p className='text-heading3-bold'>Shopping Cart</p>
                <hr className='my-6' />

                {cart.cartItems.map((cartItem, index) => (
                    <div
                        key={index}
                        className='w-full flex max-sm:flex-col rounded-lg max-sm:gap-3 hover:bg-grey-3 px-4 py-3 items-center max-sm:items-start justify-between'>
                        <div className='flex items-center'>
                            <Image
                                src={cartItem.item.media[0] || '/placeholder.jpg'}
                                width={100}
                                height={100}
                                className='rounded-lg w-32 h-32 object-contain'
                                alt='product'
                            />
                            <div className='flex flex-col gap-3 ml-4 capitalize'>
                                <p className='text-body-bold'>{cartItem.item.title}</p>
                                {cartItem.color && (
                                    <p className='text-small-medium'>Color: {cartItem.color}</p>
                                )}
                                {cartItem.size && (
                                    <p className='text-small-medium'>Size: {cartItem.size}</p>
                                )}
                                <p className='text-small-medium'>Price: ${cartItem.item.price}</p>
                            </div>
                        </div>

                        <div className='flex gap-4 items-center'>
                            <MinusCircle
                                className='hover:text-red-1 cursor-pointer'
                                onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                            />
                            <p className='text-body-bold'>{cartItem.quantity}</p>
                            <PlusCircle
                                className='hover:text-red-1 cursor-pointer'
                                onClick={() => cart.increaseQuantity(cartItem.item._id)}
                            />

                            <Trash2
                                className='hover:text-red-1 cursor-pointer'
                                onClick={() => cart.removeItem(cartItem.item._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-3 rounded-lg px-4 py-5'>
                <p className='text-heading4-bold pb-4'>
                    Summary{' '}
                    <span>{`(${cart.cartItems.length} ${
                        cart.cartItems.length > 1 ? 'items' : 'item'
                    })`}</span>
                </p>
                <div className='flex justify-between text-body-semibold'>
                    <span>Total Amount</span>
                    <span>$ {totalRounded}</span>
                </div>
                <button
                    onClick={handleCheckout}
                    className='border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-grey-1 hover:text-white'>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
