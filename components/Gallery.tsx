'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryProps {
    productMedia: [string];
}

const Gallery: React.FC<GalleryProps> = ({ productMedia }) => {
    const [mainImage, setMainImage] = useState(productMedia?.[0]);

    return (
        <div className='flex flex-col gap-3 max-w-[500px]'>
            <Image
                src={mainImage}
                width={500}
                height={500}
                alt='product'
                className='w-96 h-96 rounded-lg shadow-xl object-contain'
            />
            <div className='flex items-center justify-center gap-2 overflow-auto tailwind-scrollbar-hide'>
                {productMedia?.map((image, index) => (
                    <Image
                        key={index}
                        src={image || '/placeholder.jpg'}
                        height={200}
                        width={200}
                        alt='product'
                        className={`w-20 h-20 rounded-lg object-contain cursor-pointer ${
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
