type CollectionType = {
    _id: string;
    title: string;
    products: number;
    image: string;
};

type ProductType = {
    _id: string;
    title: string;
    description: string;
    collections: [string];
    category: string;
    media: [string];
    thumbnail: string;
    tags: [string];
    price: number;
    discount: number;
    rating: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
};

type UserType = {
    clerkId: string;
    wishlist: [string];
    createdAt: string;
    updatedAt: string;
};

type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType];
    shippingRate: string;
    totalAmount: number;
};

type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
};
