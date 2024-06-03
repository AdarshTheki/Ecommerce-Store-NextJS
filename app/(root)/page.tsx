import Image from 'next/image';
import React from 'react';

import Collections from '@/components/Collections';
import ProductList from '@/components/ProductList';
import { getProducts, getCollections, data } from '@/lib/actions';

const Home = async () => {
    const products = await getProducts();
    const collections = await getCollections();

    return (
        <div>
            <Image src={'/banner.png'} alt='banner' width={2000} height={1000} />
            <div className='max-w-screen-xl mx-auto'>
                <div className='flex flex-wrap items-center justify-center'>
                    {data.map((item) => (
                        <div key={item.id} className='md:w-1/2 lg:w-1/3 py-4 px-4'>
                            <a href={item.url}>
                                <div className='bg-white relative shadow p-2 rounded-lg text-gray-800 hover:shadow-lg'>
                                    <div className='right-0 mt-4 rounded-l-full absolute text-center font-bold text-xs text-white px-2 py-1 bg-orange-500'>
                                        {item.follower} Follower
                                    </div>
                                    <Image
                                        src={item.image}
                                        className='h-32 rounded-lg w-full object-cover'
                                        alt={item.name}
                                        width={300}
                                        height={300}
                                    />
                                    <div className='flex justify-center'>
                                        <Image
                                            src={item.pic}
                                            className='rounded-full -mt-6 border-4 object-center object-cover border-white mr-2 h-16 w-16'
                                            alt={item.name}
                                            width={300}
                                            height={300}
                                        />
                                    </div>
                                    <div className='py-2 px-2'>
                                        <p className='font-bold font-title text-center'>
                                            {item.name}
                                        </p>

                                        <p className='text-sm font-light text-center my-2'>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                <Collections collections={collections} />
                <ProductList products={products} />
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Home;
