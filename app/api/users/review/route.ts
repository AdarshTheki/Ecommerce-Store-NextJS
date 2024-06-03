import Review from '@/lib/Review.model';
import { connectToDB } from '@/lib/mongoDB';

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        await connectToDB();

        const { productId, comment, rating } = await req.json();

        if (!productId || !comment || !rating) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        let reviewDoc = await Review.findOne({ userId });

        if (!reviewDoc) {
            reviewDoc = new Review({
                userId,
                review: [{ productId, rating, comment }],
            });
        } else {
            const existingReview = reviewDoc.review.find(
                (r: any) => r.productId.toString() === productId
            );

            if (existingReview) {
                existingReview.rating = rating;
                existingReview.comment = comment;
            } else {
                reviewDoc.review.push({ productId, rating, comment });
            }
        }

        await reviewDoc.save();

        return NextResponse.json(reviewDoc, { status: 200 });
    } catch (err) {
        console.log('[review_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
