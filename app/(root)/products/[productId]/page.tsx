import ProductInfo from '@/components/ProductInfo';
import Gallery from '@/components/Gallery';
import ProductCard from '@/components/ProductCard';

export default async function Page({ params: { productId } }: { params: { productId: string } }) {
    const product = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`)
    ).json();

    const related = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`)
    ).json();

    return (
        <div className='px-4 mx-auto max-w-[1000px]'>
            {/*  */}
            <div className='flex justify-center items-start gap-16 py-10 max-md:flex-col max-md:items-center'>
                <Gallery productMedia={product?.media} />
                <ProductInfo productInfo={product} />
            </div>

            {/*  */}
            <div className='w-full'>
                <p className='text-heading3-bold text-center py-5'>Related Products</p>
                {related?.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                        {related?.map((product: ProductType) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <h2 className='text-center py-10 text-base-medium'>
                        Loading data | Please wait...
                    </h2>
                )}
            </div>
        </div>
    );
}
