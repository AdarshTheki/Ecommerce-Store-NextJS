'use server';

export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    return await collections.json();
};

export const getCollectionDetail = async (collectionId: string) => {
    const collections = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
    );
    return await collections.json();
};

export const getProducts = async (page?: number, limit?: number, sortBy?: string) => {
    const products = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products?sortBy=${sortBy}&page=${page}&limit=${limit}`
    );
    return await products.json();
};

export const getProductsByCategory = async (category: string) => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${category}`);
    return await products.json();
};

export const getProductDetails = async (productId: string) => {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return await product.json();
};

export const getSearchedProducts = async (query: string) => {
    const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    return await searchedProducts.json();
};

export const getRelatedProducts = async (productId: string) => {
    const relatedProducts = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
    );
    return await relatedProducts.json();
};

// this api
export const fetchReview = async (productId: string) => {
    const reviews = await fetch(`${process.env.NEXT_PUBLIC_STORE_URL}/users/review/${productId}`);
    return await reviews?.json();
};

export const getUser = async () => {
    const user = await fetch(`${process.env.NEXT_PUBLIC_STORE_URL}/users`);
    return await user.json();
};
