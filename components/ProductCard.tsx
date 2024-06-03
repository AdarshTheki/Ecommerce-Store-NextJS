import Link from 'next/link';
import HeartFavorite from './HeartFavorite';

interface ProductCardProps {
    product: ProductType;
    isLikedProduct?: boolean;
    updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, isLikedProduct, updateSignedInUser }: ProductCardProps) => {
    return (
        <div className='max-w-[230px] mx-auto flex flex-col gap-2'>
            <Link
                href={`/products/${product._id}`}
                style={{ backgroundImage: `url('${product?.media[0]}')` }}
                className='relative w-full sm:h-52 h-40 bg-cover bg-top rounded-lg overflow-hidden shadow-lg'></Link>
            <div className='p-2'>
                <p className='text-base-bold capitalize'>{product.title}</p>
                <p className='text-small-medium text-slate-400 capitalize'>{product.category}</p>
                <div className='flex justify-between items-center'>
                    <p className='text-body-bold'>
                        {product.price?.toLocaleString('en-IN', {
                            maximumFractionDigits: 0,
                            style: 'currency',
                            currency: 'INR',
                        })}
                    </p>
                    <HeartFavorite
                        product={product}
                        isLikedProduct={isLikedProduct}
                        updateSignedInUser={updateSignedInUser}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
