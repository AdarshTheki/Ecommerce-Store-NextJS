import Image from 'next/image';

import Collections from '@/components/Collections';
import { getCollections } from '@/lib/actions';

const Home = async () => {
    const collections = await getCollections();

    return (
        <>
            <Image src={'/banner.png'} alt='banner' width={2000} height={1000} />
            <div className='max-w-screen-xl mx-auto'>
                <Collections collections={collections} />
            </div>
        </>
    );
};

export const dynamic = 'force-dynamic';

export default Home;
