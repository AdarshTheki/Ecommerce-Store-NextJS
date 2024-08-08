import ProductInfo from '@/components/ProductInfo';
import Gallery from '@/components/Gallery';
import ProductCard from '@/components/ProductCard';
// import ReviewCard from '@/components/ReviewCard';

export async function ProductGallery({ id }: { id: string }) {
    const product: ProductType = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
    ).json();

    return product?._id ? (
        <div className='flex justify-center items-start gap-16 py-10 max-md:flex-col max-md:items-center'>
            <Gallery productMedia={product.media} />
            <ProductInfo productInfo={product} />
        </div>
    ) : (
        <h2 className='text-center py-10 text-base-medium'>Loading data | Please wait...</h2>
    );
}

export async function ProductRelated({ id }: { id: string }) {
    const related: ProductType[] = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/related`)
    ).json();

    return (
        <div className='w-full'>
            <p className='text-heading3-bold text-center py-5'>Related Products</p>
            {related?.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4'>
                    {related.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <h2 className='text-center py-10 text-base-medium'>
                    Loading data | Please wait...
                </h2>
            )}
        </div>
    );
}

export default async function Page({ params: { productId } }: { params: { productId: string } }) {
    return (
        <div className='px-4 mx-auto max-w-[1000px]'>
            <ProductGallery id={productId} />
            <ProductRelated id={productId} />
        </div>
    );
}

// const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);

// const reviewsRes = await fetch(`/api/users/review/${productId}`);

// const relatedRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
// );
