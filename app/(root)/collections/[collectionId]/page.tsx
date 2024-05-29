'use client';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getCollectionDetail = async () => {
        try {
            const collection = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/collections/${params.collectionId}`
            );
            const result = await collection.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCollectionDetail();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className='sm:px-10 px-2 py-5 flex flex-col items-center gap-8'>
            <Image
                src={data?.image}
                width={1500}
                height={1000}
                alt='collection'
                className='w-full h-[400px] object-contain rounded-xl'
            />
            <p className='text-heading3-bold text-grey-2'>{data?.title}</p>
            <p className='text-body-normal text-grey-2 text-center max-w-[900px]'>
                {data?.description}
            </p>
            <div className='sm:flex grid grid-cols-2 gap-5 flex-wrap sm:gap-16 mx-auto'>
                {data?.products.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CollectionDetail;
