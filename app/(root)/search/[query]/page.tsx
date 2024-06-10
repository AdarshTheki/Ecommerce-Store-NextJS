'use client';

import ProductCard from '@/components/ProductCard';
import Loader from '@/utils/Loader';
import useFetch from '@/utils/useFetch';

const Search = ({ params }: { params: { query: string } }) => {
    const { isLoading, data, error } = useFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/search/${params.query}`
    );
    const decodedQuery = decodeURIComponent(params.query);

    if (isLoading) return <Loader text='Loaded data! Please wait...' />;

    if (error) return <Loader text='Something was wrong! Please try again?' />;

    return (
        <div className='sm:px-10 py-5 px-2'>
            <p className='sm:text-heading3-bold text-heading4-bold sm:my-10 py-2'>
                Search results for &quot;{decodedQuery}&quot;
            </p>
            {!data ||
                (data?.length === 0 && <p className='text-body-bold my-5'>No result found</p>)}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {data?.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Search;
