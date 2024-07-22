import Link from 'next/link';
import HeartFavorite from './HeartFavorite';
import Image from 'next/image';

export interface ProductCardProps {
    product: ProductType;
    isLikedProduct?: boolean;
}

const ProductCard = async ({ product, isLikedProduct }: ProductCardProps) => {
    return (
        // <div className='mx-auto w-full text-grey-1 grid gap-2 border rounded-lg'>
        //     <Link
        //         href={`/products/${product._id}`}
        //         className='bg-gray-100 bg-cover bg-center'
        //         style={{
        //             backgroundImage: `url('${product.thumbnail ?? '/placeholder.jpg'}')`,
        //             mixBlendMode: 'multiply',
        //             width: '100%',
        //             height: '200px',
        //         }}></Link>
        //     <div className='p-2'>
        //         <p className='sm:text-base-bold text-small-bold capitalize'>{product.title}</p>
        //         <p className='text-small-medium text-slate-400 capitalize'>{product.category}</p>
        //         <div className='flex justify-between items-center'>
        //             <p className='sm:text-body-bold text-small-bold'>
        //                 {product.price?.toLocaleString('en-US', {
        //                     maximumFractionDigits: 0,
        //                     style: 'currency',
        //                     currency: 'USD',
        //                 })}
        //             </p>
        //             <HeartFavorite product={product} isLikedProduct={isLikedProduct} />
        //         </div>
        //     </div>
        // </div>
        <div
            className='grid text-grey-1 w-full border border-transparent hover:border-gray-200 rounded-lg'
            key={product?._id}>
            <Link
                href={`/products/${product?._id}`}
                className='relative bg-gray-200 aspect-square max-h-[200px] w-full overflow-hidden rounded-md'>
                <Image
                    className='h-full bg-gray-200 w-full transform transition-transform duration-300 ease-linear hover:scale-110 hover:shadow-md'
                    src={product?.thumbnail}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    alt={product?.title}
                />
                <small className='absolute bottom-4 right-2 bg-white px-2 py-0 rounded-full text-green-600'>
                    {product?.discount.toFixed(1)}%
                </small>
                <small className='absolute bottom-4 left-2 bg-white px-2 py-0 rounded-full text-red-1'>
                    {product?.rating.toFixed(1)}
                </small>
            </Link>
            <div className='capitalize p-2'>
                <p>{product?.title}</p>
                <p className='text-small-medium text-gray-500'>{product?.category}</p>
                <div className='flex justify-between items-center'>
                    <p className='sm:text-body-bold text-small-medium'>
                        {product.price?.toLocaleString('en-US', {
                            maximumFractionDigits: 0,
                            style: 'currency',
                            currency: 'USD',
                        })}
                    </p>
                    <HeartFavorite product={product} isLikedProduct={isLikedProduct} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
