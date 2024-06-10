'use client';

import ProductList from '@/components/ProductList';
import Loader from '@/utils/Loader';
import useFetch from '@/utils/useFetch';

const ProductPage = () => {
    const { isLoading, data, error } = useFetch('/api/users');

    if (isLoading) return <Loader text='Loaded data! Please wait...' />;

    if (error) return <Loader text='Something was wrong! Please try again?' />;

    return (
        <div>
            <ProductList users={data} />
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default ProductPage;
