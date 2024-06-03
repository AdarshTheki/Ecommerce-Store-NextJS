export const getCollections = async () => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    return await collections.json();
};

export const getProducts = async () => {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
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
export const getUser = async () => {
    const user = await fetch(`/api/users`);
    return await user.json();
};

export const getReview = async (productId: string) => {
    const reviews = await fetch(`http://localhost:3000/api/users/review/${productId}`);
    return await reviews.json();
};

const urls = '/coverImage.jpg';

export const data = [
    {
        id: 1,
        url: '#',
        image: urls,
        pic: '/pic1.jpg',
        name: 'Kucing Malas',
        description: 'Portal pecinta kucing',
        follower: 12,
    },
    {
        id: 2,
        url: '#',
        image: urls,
        pic: '/pic2.jpg',
        name: 'Adarsh Verma',
        description: 'Nothing about Portal  kucing',
        follower: 42,
    },
    {
        id: 3,
        url: '#',
        image: urls,
        pic: '/pic3.jpg',
        name: 'Umesh Kumar Yadev',
        description: 'This is haking of website',
        follower: 104,
    },
];
