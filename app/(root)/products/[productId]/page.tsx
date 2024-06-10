'use client';

import ProductInfo from '@/components/ProductInfo';
import Gallery from '@/components/Gallery';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import ReviewPosts from '@/components/ReviewPost';
import useFetch from '@/utils/useFetch';
import React from 'react';

const ProductDetail = ({ params }: { params: { productId: string } }) => {
    return (
        <div>
            {ProductInfoComponent(params.productId)}
            {ReviewComponent(params.productId)}
            {RelatedComponent(params.productId)}
        </div>
    );
};

export const dynamic = 'force-dynamic';
export default ProductDetail;

const ProductInfoComponent: React.FC<string> = (id) => {
    const { data, isLoading, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    if (isLoading) return <h2 className='text-center py-10 text-heading3-bold'>Loading...</h2>;
    if (error) return <h2 className='text-center py-10 text-heading3-bold'>Error...</h2>;
    return (
        <div className='flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center'>
            <Gallery productMedia={data?.media} />
            <ProductInfo productInfo={data} />
        </div>
    );
};

const ReviewComponent: React.FC<string> = (id) => {
    const { data, isLoading, error } = useFetch(`/api/users/review/${id}`);
    if (isLoading) return <h2 className='text-center py-10 text-heading3-bold'>Loading...</h2>;
    if (error) return <h2 className='text-center py-10 text-heading3-bold'>Error...</h2>;
    return (
        <div className='bg-gray-200 p-2'>
            <h2 className='text-heading3-bold text-center py-5'>Your opinion matters to us!</h2>
            <div className='grid sm:grid-cols-2 gap-5'>
                <ReviewCard review={data} />
                <ReviewPosts productId={id} />
            </div>
        </div>
    );
};

const RelatedComponent: React.FC<string> = (id) => {
    const { data, isLoading, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}/related`
    );
    if (isLoading) return <h2 className='text-center py-10 text-heading3-bold'>Loading...</h2>;
    if (error) return <h2 className='text-center py-10 text-heading3-bold'>Error...</h2>;

    return (
        <div className='sm:px-10 px-4 w-full'>
            <p className='text-heading3-bold text-center py-5'>Related Products</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                {data?.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};
