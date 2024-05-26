import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import HeartFavorite from './HeartFavorite';

interface ProductCardProps {
    product: ProductType;
    isLikedProduct?: boolean;
    updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, isLikedProduct, updateSignedInUser }: ProductCardProps) => {
    return (
        <div className='w-[200px] flex flex-col gap-2'>
            <Link href={`/products/${product._id}`} className='hover:bg-slate-100'>
                <Image
                    src={product.media[0]}
                    alt='product'
                    width={250}
                    height={230}
                    className='max-h-[230px] rounded-lg border p-4'
                />
            </Link>
            <div className=''>
                <p className='text-base-bold'>{product.title}</p>
                <p className='text-small-medium text-slate-400 capitalize'>{product.category}</p>
                <div className='flex justify-between items-center'>
                    <p className='text-body-bold'>${product.price}</p>
                    <HeartFavorite
                        product={product}
                        isLikedProduct={isLikedProduct}
                        updateSignedInUser={updateSignedInUser}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
