import ReviewCard from '@/components/ReviewCard';
import { connectToDB } from '@/lib/mongoDB';
import Review from '@/models/Review.model';
import { auth } from '@clerk/nextjs/server';

const Page = async () => {
    const { userId } = auth();
    await connectToDB();
    const reviews = await Review.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        { $unwind: '$userDetails' },
        {
            $match: {
                'userDetails.clerkId': userId,
            },
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                comment: 1,
                createdAt: 1,
                updatedAt: 1,
                rating: 1,
                'userDetails._id': 1,
                'userDetails.name': 1,
            },
        },
    ]);

    return (
        <div className='p-2 py-10 mx-auto max-w-4xl'>
            {reviews?.length > 0 ? (
                <ReviewCard reviews={reviews} />
            ) : (
                <h2 className='text-center py-10'>Your review not found</h2>
            )}
        </div>
    );
};

export default Page;
