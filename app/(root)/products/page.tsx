import ProductList from '@/components/ProductList';
import User from '@/lib/User.model';
import { getProducts } from '@/lib/actions';
import { auth } from '@clerk/nextjs/server';

const ProductPage = async () => {
    const { userId } = auth();
    const products = await getProducts();
    const users = await User.findOne({ clerkId: userId });

    return (
        <div>
            <ProductList products={products} users={users} />
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default ProductPage;
