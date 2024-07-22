import Image from 'next/image';

import { getCollections, getProductsByCategory } from '@/lib/actions';
import Link from 'next/link';

const Home = async () => {
    const collections = await getCollections();
    const productsByOne = await getProductsByCategory('beauty');
    const productsByTwo = await getProductsByCategory('mobile');
    const productsByThree = await getProductsByCategory('women');

    return (
        <div className='mx-auto max-w-screen-xl'>
            <Image src={'/banner.png'} alt='banner' width={2000} height={1000} />
            <div className='px-2'>
                <h3 className='font-display text-xl font-semibold leading-6 md:text-[2rem] pb-3 pl-2.5 pt-1 md:pb-8 md:pl-0 md:pt-6 md:text-center'>
                    Shop By Categories
                </h3>
                <div className='container grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-6 md:gap-4'>
                    {collections.map((item: CollectionType) => (
                        <Link
                            href={`/collections/${item?._id}`}
                            className='grid cursor-pointer font-medium text-gray-600 hover:font-semibold hover:text-black'
                            key={item._id}>
                            <div className='relative bg-gray-200 aspect-square max-h-[200px] overflow-hidden rounded-md'>
                                <Image
                                    className='h-full bg-gray-200 w-full transform transition-transform duration-300 ease-linear hover:scale-110 hover:shadow-md'
                                    src={item.image}
                                    fill
                                    alt={item.title}
                                />
                            </div>
                            <small className='mx-2 pt-2 text-center md:mx-0 md:p-4 md:text-base capitalize'>
                                {item.title}
                            </small>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='pt-3 mt-3 border-t-2 border-gray-200 px-2'>
                <h3 className='font-display text-xl font-semibold leading-6 md:text-[2rem] pb-3 pl-2.5 pt-1 md:pb-8 md:pl-0 md:pt-6 md:text-center'>
                    Shop By Beauty
                </h3>
                <div className='container grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-6 md:gap-4'>
                    {productsByOne?.map((item: ProductType) => (
                        <Link
                            href={`/products/${item?._id}`}
                            className='grid cursor-pointer font-medium text-gray-600 hover:font-semibold hover:text-black'
                            key={item?._id}>
                            <div className='relative bg-gray-200 aspect-square max-h-[200px] overflow-hidden rounded-md'>
                                <Image
                                    className='h-full bg-gray-200 w-full transform transition-transform duration-300 ease-linear hover:scale-110 hover:shadow-md'
                                    src={item?.thumbnail}
                                    fill
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    alt={item?.title}
                                />
                                <small className='absolute bottom-4 right-2 bg-white px-2 py-0 rounded text-grey-1'>
                                    {item?.price?.toLocaleString('en-US', {
                                        maximumFractionDigits: 0,
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </small>
                            </div>
                            <small className='mx-2 pt-2 text-center md:mx-0 md:p-4 md:text-base capitalize'>
                                {item?.title}
                            </small>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='pt-3 mt-3 border-t-2 border-gray-200 px-2'>
                <h3 className='font-display text-xl font-semibold leading-6 md:text-[2rem] pb-3 pl-2.5 pt-1 md:pb-8 md:pl-0 md:pt-6 md:text-center'>
                    Shop By mobiles & Accessories
                </h3>
                <div className='container grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-6 md:gap-4'>
                    {productsByTwo?.map((item: ProductType) => (
                        <Link
                            href={`/products/${item?._id}`}
                            className='grid cursor-pointer font-medium text-gray-600 hover:font-semibold hover:text-black'
                            key={item?._id}>
                            <div className='relative bg-gray-200 aspect-square max-h-[200px] overflow-hidden rounded-md'>
                                <Image
                                    className='h-full bg-gray-200 w-full transform transition-transform duration-300 ease-linear hover:scale-110 hover:shadow-md'
                                    src={item?.thumbnail}
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    fill
                                    alt={item?.title}
                                />
                                <small className='absolute bottom-4 right-2 bg-white px-2 py-0 rounded text-grey-1'>
                                    {item?.price?.toLocaleString('en-US', {
                                        maximumFractionDigits: 0,
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </small>
                            </div>
                            <small className='mx-2 pt-2 text-center md:mx-0 md:p-4 md:text-base capitalize'>
                                {item?.title}
                            </small>
                        </Link>
                    ))}
                </div>
            </div>

            <div className='pt-3 mt-3 border-t-2 border-gray-200 px-2'>
                <h3 className='font-display text-xl font-semibold leading-6 md:text-[2rem] pb-3 pl-2.5 pt-1 md:pb-8 md:pl-0 md:pt-6 md:text-center'>
                    Shop By Mens & Womens
                </h3>
                <div className='container grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-6 md:gap-4'>
                    {productsByThree?.map((item: ProductType) => (
                        <Link
                            href={`/products/${item?._id}`}
                            className='grid cursor-pointer font-medium text-gray-600 hover:font-semibold hover:text-black'
                            key={item?._id}>
                            <div className='relative bg-gray-200 aspect-square max-h-[200px] overflow-hidden rounded-md'>
                                <Image
                                    className='h-full bg-gray-200 w-full transform transition-transform duration-300 ease-linear hover:scale-110 hover:shadow-md'
                                    src={item?.thumbnail}
                                    fill
                                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                    placeholder='empty'
                                    alt={item?.title}
                                />
                                <small className='absolute bottom-4 right-2 bg-white px-2 py-0 rounded text-grey-1'>
                                    {item?.price?.toLocaleString('en-US', {
                                        maximumFractionDigits: 0,
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </small>
                            </div>
                            <small className='mx-2 pt-2 text-center md:mx-0 md:p-4 md:text-base capitalize'>
                                {item?.title}
                            </small>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Home;
