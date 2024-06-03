import Review from '@/lib/Review.model';
import { connectToDB } from '@/lib/mongoDB';
import mongoose from 'mongoose';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        if (!params.productId || typeof params.productId !== 'string') {
            return new NextResponse(JSON.stringify({ message: 'Invalid productId' }), {
                status: 400,
            });
        }

        await connectToDB();

        // const reviews = await Review.find({ 'review.productId': params.productId });

        // const filteredReviews = reviews.map((reviewDoc) => ({
        //     userId: reviewDoc.userId,
        //     reviews: reviewDoc.review.filter(
        //         (r: any) => r.productId.toString() === params.productId
        //     ),
        // }));

        const reviewLists = await Review.aggregate([
            {
                $match: {
                    'review.productId': new mongoose.Types.ObjectId(params.productId),
                },
            },
            {
                $unwind: '$review',
            },
            {
                $match: {
                    'review.productId': new mongoose.Types.ObjectId(params.productId),
                },
            },
            {
                $project: {
                    _id: 1,
                    userId: '$userId',
                    comment: '$review.comment',
                    rating: '$review.rating',
                },
            },
        ]);

        return NextResponse.json(reviewLists, { status: 200 });
    } catch (err) {
        console.log('[review_by_productId_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
