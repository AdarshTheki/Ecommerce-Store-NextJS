import ProductList from '@/components/ProductList';
import User from '@/lib/User.model';
import { auth } from '@clerk/nextjs/server';

const ProductPage = async () => {
    const { userId } = auth();
    const users = await User.findOne({ clerkId: userId });

    return (
        <div>
            <ProductList users={users} />
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default ProductPage;
