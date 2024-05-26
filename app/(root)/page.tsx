import Image from 'next/image';
import React from 'react';

import Collections from '@/components/Collections';
import ProductList from '@/components/ProductList';
import { getProducts, getCollections } from '@/lib/actions';

const Home = async () => {
    const products = await getProducts();
    const collections = await getCollections();
    return (
        <>
            <Image
                src={'/banner.png'}
                alt='banner'
                width={2000}
                height={1000}
                className='w-screen'
            />
            <Collections collections={collections} />
            <ProductList products={products} />
        </>
    );
};

export const dynamic = 'force-dynamic';

export default Home;
