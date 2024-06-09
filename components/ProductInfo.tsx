'use client';

import React, { useState } from 'react';
import HeartFavorite from './HeartFavorite';
import { MinusCircle, PlusCircle } from 'lucide-react';
import useCart from '@/lib/useCart';

interface ProductInfoProps {
    productInfo: ProductType;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const colors = ['White', 'Gray', 'Red', 'Blue', 'Green', 'Yellow'];

const ProductInfo: React.FC<ProductInfoProps> = ({ productInfo }) => {
    const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
    const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);
    const [quantity, setQuantity] = useState<number>(1);

    const cart = useCart();

    return (
        <div className='max-w-[400px] w-full flex flex-col gap-4 text-grey-1'>
            <div className='flex justify-between items-center'>
                <p className='sm:text-heading3-bold text-heading4-bold capitalize'>
                    {productInfo?.title}
                </p>
                <HeartFavorite product={productInfo} isLikedProduct={false} />
            </div>

            <div className='flex gap-2'>
                <p className='text-base-medium text-grey-2'>Category:</p>
                <p className='text-base-bold'>{productInfo?.category}</p>
            </div>

            <p className='text-heading3-bold'>$ {productInfo?.price}</p>

            <div className='flex flex-col gap-2'>
                <p className='text-base-medium text-grey-2'>Description:</p>
                <p className='text-small-medium'>{productInfo?.description}</p>
            </div>

            {colors.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <p className='text-base-medium text-grey-2'>Colors:</p>
                    <div className='flex gap-2 flex-wrap'>
                        {colors.map((color, index) => (
                            <p
                                key={index}
                                className={`border border-grey-1 px-2 py-1 rounded-lg cursor-pointer capitalize ${
                                    selectedColor === color && 'bg-grey-1 text-white'
                                }`}
                                onClick={() => setSelectedColor(color)}>
                                {color}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {sizes.length > 0 && (
                <div className='flex flex-col gap-2'>
                    <p className='text-base-medium text-grey-2'>Sizes:</p>
                    <div className='flex gap-2 flex-wrap'>
                        {sizes.map((size, index) => (
                            <p
                                key={index}
                                className={`border border-grey-1 px-2 py-1 rounded-lg cursor-pointer ${
                                    selectedSize === size && 'bg-grey-1 text-white'
                                }`}
                                onClick={() => setSelectedSize(size)}>
                                {size}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            <div className='flex flex-col gap-2'>
                <p className='text-base-medium text-grey-2'>Quantity:</p>
                <div className='flex gap-4 items-center'>
                    <MinusCircle
                        className='hover:text-red-1 cursor-pointer'
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    />
                    <p className='text-body-bold'>{quantity}</p>
                    <PlusCircle
                        className='hover:text-red-1 cursor-pointer'
                        onClick={() => setQuantity(quantity + 1)}
                    />
                </div>
            </div>

            <button
                className='outline text-base-bold py-3 rounded-lg hover:bg-grey-1 hover:text-white'
                onClick={() => {
                    cart.addItem({
                        item: productInfo,
                        quantity,
                        color: selectedColor,
                        size: selectedSize,
                    });
                }}>
                Add To Cart
            </button>
        </div>
    );
};

export default ProductInfo;
