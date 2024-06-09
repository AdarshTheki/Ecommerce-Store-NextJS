import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { getCollectionDetail } from '@/lib/actions';

const CollectionDetail = async ({ params }: { params: { collectionId: string } }) => {
    const data = await getCollectionDetail(params.collectionId);
    return (
        <div className='sm:px-10 px-2 py-5 flex flex-col items-center gap-8'>
            <Image
                src={data?.image}
                width={1500}
                height={1000}
                alt='collection'
                className='w-full h-[400px] object-contain rounded-xl'
            />
            <p className='text-heading3-bold text-grey-2'>{data?.title}</p>
            <p className='text-body-normal text-grey-2 text-center max-w-[900px]'>
                {data?.description}
            </p>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {data?.products?.map((product: ProductType) => (
                    <ProductCard key={product?._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default CollectionDetail;
