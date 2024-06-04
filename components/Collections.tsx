import Link from 'next/link';

const Collections = async ({ collections }: { collections: CollectionType[] }) => {
    return (
        <div className=' text-grey-1 px-4 py-5'>
            <h2 className='text-heading2-bold'>Collections</h2>
            <p className='py-5'>
                Our ecommerce app offers a wide range of products including phones, clothes, and
                computers, all neatly organized into curated collections for easy browsing. From the
                latest smartphones to trendy fashion pieces and high-performance laptops, our app
                showcases a variety of items to suit every need and preference.
            </p>
            {!collections || collections.length === 0 ? (
                <p className='text-heading3-bold text-center py-10'>No collections found</p>
            ) : (
                <section className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8'>
                    {collections.map((collection: CollectionType) => (
                        <article
                            key={collection._id}
                            className='relative w-full sm:h-52 h-40 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  transition duration-300 ease-in-out'
                            style={{ backgroundImage: `url('${collection.image}')` }}>
                            <div className='absolute inset-0 bg-black bg-opacity-60 group-hover:opacity-85 transition duration-300 ease-in-out'></div>
                            <div className='relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center'>
                                <h3 className='text-center'>
                                    <Link
                                        className='text-white text-heading4-bold text-center'
                                        href={`/collections/${collection._id}`}>
                                        {/* <span className='absolute inset-0'></span> */}
                                        {collection.title}
                                    </Link>
                                </h3>
                            </div>
                        </article>
                    ))}
                </section>
            )}
            <p className='py-5'>
                Overall, our e-commerce app with Next.js is designed to provide a convenient,
                secure, and enjoyable shopping experience for users, while also offering sellers a
                modern and efficient platform to showcase and sell their products. With its
                user-friendly interface, fast loading times, and personalized recommendations, our
                app sets a new standard for online shopping.
            </p>
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Collections;
