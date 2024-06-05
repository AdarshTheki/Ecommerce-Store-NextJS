import Link from 'next/link';
import HeartFavorite from './HeartFavorite';
import Image from 'next/image';

interface ProductCardProps {
    product: any;
    isLikedProduct?: boolean;
    updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, isLikedProduct, updateSignedInUser }: ProductCardProps) => {
    const url = typeof product.media === 'string' ? product.media : product.media[0];
    return (
        <div className='max-w-[230px] mx-auto text-grey-1 grid gap-2'>
            <Link href={`/products/${product._id}`}>
                <Image
                    src={url || '/placeholder.jpg'}
                    alt='productImage'
                    width={250}
                    height={180}
                />
            </Link>
            <div className='p-2'>
                <p className='sm:text-base-bold text-small-bold capitalize'>{product.title}</p>
                <p className='text-small-medium text-slate-400 capitalize'>{product.category}</p>
                <div className='flex justify-between items-center'>
                    <p className='sm:text-body-bold text-small-bold'>
                        {product.expense?.toLocaleString('en-IN', {
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
