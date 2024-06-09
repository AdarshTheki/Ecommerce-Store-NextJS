import Link from 'next/link';
import HeartFavorite from './HeartFavorite';

export interface ProductCardProps {
    product: ProductType;
    isLikedProduct?: boolean;
}

const ProductCard = async ({ product, isLikedProduct }: ProductCardProps) => {
    return (
        <div className='mx-auto w-full text-grey-1 grid gap-2 border rounded-lg'>
            <Link
                href={`/products/${product._id}`}
                className='bg-gray-100 bg-cover bg-center'
                style={{
                    backgroundImage: `url('${product.thumbnail ?? '/placeholder.jpg'}')`,
                    mixBlendMode: 'multiply',
                    width: '100%',
                    height: '200px',
                }}></Link>
            <div className='p-2'>
                <p className='sm:text-base-bold text-small-bold capitalize'>{product.title}</p>
                <p className='text-small-medium text-slate-400 capitalize'>{product.category}</p>
                <div className='flex justify-between items-center'>
                    <p className='sm:text-body-bold text-small-bold'>
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
