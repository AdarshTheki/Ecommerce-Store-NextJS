'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

import Loader from '@/utils/Loader';
import useFetch from '@/utils/useFetch';

const OrdersPage = () => {
    const { user } = useUser();
    const { data, isLoading, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${user?.id}`
    );

    if (isLoading) return <Loader text='Loaded data! Please wait...' />;

    if (error) return <Loader text='Something was wrong! Please try again ?' />;

    // console.log(data);

    return (
        <div className='px-10 py-5 max-sm:px-3'>
            <p className='text-heading3-bold my-10'>Your Orders</p>
            {!data ||
                (data?.length === 0 && (
                    <p className='text-body-bold my-5'>You have no orders yet.</p>
                ))}

            <div className='flex flex-col gap-10'>
                {data?.map((order: OrderType) => (
                    <div key={order._id} className='flex flex-col gap-8 p-4 hover:bg-grey-3/50'>
                        <div className='flex gap-20 max-md:flex-col max-md:gap-3'>
                            <p className='text-base-bold'>Order ID: {order._id}</p>
                            <p className='text-base-bold'>Total Amount: ${order.totalAmount}</p>
                        </div>

                        <div className='flex flex-col gap-5'>
                            {order.products.map((orderItem: OrderItemType) => (
                                <div key={orderItem?.product?._id} className='flex gap-4'>
                                    <Image
                                        src={orderItem?.product?.media[0] || '/placeholder.jpg'}
                                        alt={orderItem?.product?.title}
                                        width={100}
                                        height={100}
                                        className='w-32 h-32 object-contain rounded-lg'
                                    />
                                    <div className='flex flex-col justify-between'>
                                        <p className='text-small-medium'>
                                            Title:{' '}
                                            <span className='text-small-bold'>
                                                {orderItem?.product?.title}
                                            </span>
                                        </p>
                                        {orderItem?.color && (
                                            <p className='text-small-medium'>
                                                Color:{' '}
                                                <span className='text-small-bold'>
                                                    {orderItem?.color}
                                                </span>
                                            </p>
                                        )}
                                        {orderItem?.size && (
                                            <p className='text-small-medium'>
                                                Size:{' '}
                                                <span className='text-small-bold'>
                                                    {orderItem?.size}
                                                </span>
                                            </p>
                                        )}
                                        <p className='text-small-medium'>
                                            Unit price:{' '}
                                            <span className='text-small-bold'>
                                                {orderItem?.product?.price}
                                            </span>
                                        </p>
                                        <p className='text-small-medium'>
                                            Quantity:{' '}
                                            <span className='text-small-bold'>
                                                {orderItem?.quantity}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default OrdersPage;
