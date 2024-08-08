import Review from '@/models/Review.model';
import { connectToDB } from '@/lib/mongoDB';
import User from '@/models/User.model';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { isValidObjectId } from 'mongoose';
import { configHeaders } from '@/lib/constant';

export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        if (!isValidObjectId(id)) throw Error('[review_id_GET] : productId is not valid');

        await connectToDB();

        const productReview = await Review.find([
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
                    productId: id,
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

        return NextResponse.json(productReview, configHeaders);
    } catch (err: any) {
        console.log(err?.message);
        return NextResponse.json(
            { message: err?.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const POST = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        if (!isValidObjectId(id)) throw Error('[review_id_GET] : productId is not valid');

        const { userId } = auth();

        if (!userId) throw Error('[review_id_POST] user is not find');

        const { comment, rating } = await req.json();

        if (!rating || !comment) throw Error('[review_id] invalid data of "comment" or "rating"');

        await connectToDB();

        const user = await User.findOne({ clerkId: userId });
        if (!user) throw Error('[review_id_POST] user not founded on database');

        const newReview = new Review({
            userId: user._id,
            productId: id,
            comment,
            rating,
        });

        await newReview.save();

        if (!newReview) throw Error('[review_id_POST] review not created');

        return NextResponse.json(newReview, configHeaders);
    } catch (err: any) {
        console.log(err?.message);
        return NextResponse.json(
            { message: err?.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const PATCH = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        if (!isValidObjectId(id)) throw Error('[review_id_PATCH] reviewId is not valid');

        const { comment, rating } = await req.json();

        if (!comment || !rating)
            throw Error('[review_id_PATCH] invalid data on "comment" or "rating"');

        await connectToDB();

        const updateReview = await Review.findByIdAndUpdate(id, { comment, rating }, { new: true });

        if (!updateReview) throw Error('[review_id_PATCH] review not updated properly');

        return NextResponse.json(updateReview, configHeaders);
    } catch (err: any) {
        console.log(err.message);
        return NextResponse.json(
            { message: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const DELETE = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        if (!isValidObjectId(id)) throw Error('[review_id_DELETE] reviewId is not valid');

        await connectToDB();

        const data = await Review.findByIdAndDelete(id);

        if (!data) throw Error('[review_id_DELETE] review not deleted properly');

        return NextResponse.json(data, configHeaders);
    } catch (err: any) {
        console.log(err?.message);
        return NextResponse.json(
            { message: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
};

export const dynamic = 'force-dynamic';
