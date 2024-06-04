'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';

const ProductList = ({ products }: { products: ProductType[] }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getUserData = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUser(data);
        } catch (error: any) {
            console.log(error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <div className='py-8 text-grey-1 px-4'>
            <h2 className='text-heading2-bold'>Products</h2>
            <p className='py-5'>
                Our app showcases these products in a visually appealing manner, ensuring a seamless
                and enjoyable shopping journey. Additionally, we take pride in curating awesome
                collections, featuring products that are carefully selected to meet your needs and
                preferences. Discover the perfect item for you with our app's detailed and
                captivating descriptions. Upgrade your shopping experience today with our ecommerce
                app.
            </p>
            {!products || products.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No products found</p>
            ) : (
                <div className='sm:flex grid grid-cols-2 gap-5 flex-wrap justify-evenly sm:gap-16 mx-auto'>
                    {products?.map((product: ProductType) => (
                        <ProductCard
                            key={product?._id}
                            product={product}
                            isLikedProduct={user?.wishlist?.includes(product._id) ?? false}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
