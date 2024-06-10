'use client';

import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import useFetch from '@/utils/useFetch';
import Loader from '@/utils/Loader';

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
    const { isLoading, data, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections/${params.collectionId}`
    );

    if (isLoading) return <Loader text='Loaded data! Please wait...' />;

    if (error) return <Loader text='Something was wrong! Please try again ?' />;

    return (
        <div className='sm:px-10 px-2 py-5 flex flex-col items-center gap-8'>
            <Image
                src={data?.image || '/placeholder.jpg'}
                width={1500}
                height={1000}
                alt='collection'
                className='w-full h-[400px] object-contain rounded-xl'
            />
            <p className='text-heading3-bold text-grey-2'>{data?.title}</p>
            <p className='text-body-normal text-grey-2 text-center max-w-[900px]'>
                {data?.description}
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                {data?.products?.map((product: ProductType) => (
                    <ProductCard key={product?._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default CollectionDetail;
