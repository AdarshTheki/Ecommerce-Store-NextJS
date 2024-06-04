import ProductList from '@/components/ProductList';
import { getProducts } from '@/lib/actions';

const ProductPage = async () => {
    const products = await getProducts();
    return (
        <div>
            <ProductList products={products} />
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default ProductPage;
