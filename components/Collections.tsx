import Image from 'next/image';
import Link from 'next/link';

const Collections = async ({ collections }: { collections: CollectionType[] }) => {
    return (
        <div className='flex flex-col items-center gap-10 py-8 px-5 text-grey-1'>
            <p className='text-heading1-bold'>Collections</p>
            {!collections || collections.length === 0 ? (
                <p className='text-heading2-bold text-center py-10'>No collections found</p>
            ) : (
                <div className='flex flex-wrap items-center justify-center gap-8'>
                    {collections.map((collection: CollectionType) => (
                        <Link href={`/collections/${collection._id}`} key={collection._id}>
                            <Image
                                key={collection._id}
                                src={collection.image}
                                alt={collection.title}
                                width={350}
                                height={200}
                                className='rounded-lg max-h-[200px] cursor-pointer'
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export const dynamic = 'force-dynamic';

export default Collections;
