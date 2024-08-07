import ProductList from '@/components/ProductList';
import { getProducts } from '@/lib/actions';
import Skeleton from 'react-loading-skeleton';

export default async function Page() {
    const product = await getProducts(1, 100);

    if (!product) {
        return (
            <div className='grid grid-cols-2 px-3 py-10 mx-auto max-w-[1000px] sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                {Array.from({ length: 20 }, (_, index) => (
                    <div className='space-y-2 rounded-lg overflow-hidden' key={index}>
                        <Skeleton height={200} />
                        <Skeleton height={50} />
                    </div>
                ))}
            </div>
        );
    }

    return <ProductList productData={product?.products} />;
}
