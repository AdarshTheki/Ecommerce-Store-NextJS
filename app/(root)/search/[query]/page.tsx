import ProductCard from '@/components/ProductCard';
import { getSearchedProducts } from '@/lib/actions';

const Search = async ({ params }: { params: { query: string } }) => {
    const searchedProducts = await getSearchedProducts(params.query);

    const decodedQuery = decodeURIComponent(params.query);

    return (
        <div className='sm:px-10 py-5 px-2'>
            <p className='sm:text-heading3-bold text-heading4-bold sm:my-10 py-2'>
                Search results for &quot;{decodedQuery}&quot;
            </p>
            {!searchedProducts ||
                (searchedProducts.length === 0 && (
                    <p className='text-body-bold my-5'>No result found</p>
                ))}
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {searchedProducts?.map((product: ProductType) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Search;
