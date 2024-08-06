/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';

interface GalleryProps {
    productMedia: [string];
}

const Gallery: React.FC<GalleryProps> = ({ productMedia }) => {
    const [mainImage, setMainImage] = useState(productMedia?.[0]);

    return (
        <div className='flex flex-col gap-3 max-w-[500px]'>
            <div className='w-full max-w-[450px] bg-gray-100 overflow-hidden'>
                <img src={mainImage} alt='main image' className='w-full object-contain' />
            </div>
            <div className='flex items-center justify-start gap-2 overflow-x-auto'>
                {productMedia?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={image}
                        className={`w-20 h-20 rounded-lg object-contain bg-gray-100 cursor-pointer ${
                            mainImage === image ? 'border-2 border-grey-1' : ''
                        }`}
                        onClick={() => setMainImage(image)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;
