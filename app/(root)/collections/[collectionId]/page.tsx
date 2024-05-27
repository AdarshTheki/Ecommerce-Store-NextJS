'use client';

import Image from 'next/image';

import ProductCard from '@/components/ProductCard';
import { getCollectionDetails } from '@/lib/actions';

const CollectionDetail = async ({ params }: { params: { collectionId: string } }) => {
    const collectionDetails = await getCollectionDetails(params.collectionId);

    return (
        <div className='sm:px-10 px-2 py-5 flex flex-col items-center gap-8'>
            <Image
                src={collectionDetails.image}
                width={1500}
                height={1000}
                alt='collection'
                className='w-full h-[400px] object-contain rounded-xl'
            />
            <p className='text-heading3-bold text-grey-2'>{collectionDetails.title}</p>
            <p className='text-body-normal text-grey-2 text-center max-w-[900px]'>
                {collectionDetails.description}
            </p>
            <div className='flex flex-wrap gap-16 justify-center'>
                {collectionDetails.products.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CollectionDetail;
