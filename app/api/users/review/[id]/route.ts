import Review from '@/models/Review.model';
import { connectToDB } from '@/lib/mongoDB';
import User from '@/models/User.model';

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export const GET = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const productReview = await Review.find({ productId: id }).populate({
            path: 'userId',
            select: 'name',
        });

        return NextResponse.json(productReview, {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err: any) {
        console.log('[review_by_productId_GET]', err?.message);
        return new NextResponse('review_by_productId_GET: Internal Server Error', { status: 500 });
    }
};

export const POST = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized User' }), {
                status: 401,
            });
        }

        const { comment, rating } = await req.json();

        if (!rating || !comment) {
            return NextResponse.json({ error: 'Invalid Data' }, { status: 401 });
        }

        await connectToDB();

        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized User' }), {
                status: 401,
            });
        }

        const newReview = await Review.create({
            userId: user._id,
            productId: id,
            comment,
            rating,
        });

        return NextResponse.json(newReview, {
            status: 202,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[review_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const PATCH = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const { comment, rating } = await req.json();

        if (!comment || !rating) {
            return NextResponse.json({ error: 'Invalid Data' }, { status: 401 });
        }

        await connectToDB();

        const updateReview = await Review.findByIdAndUpdate(id, { comment, rating }, { new: true });

        return NextResponse.json(updateReview, {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[review_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized User' }), {
                status: 401,
            });
        }

        await connectToDB();

        const data = await Review.findByIdAndDelete(id);

        return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
        console.log('[review_DELETE]', err?.message);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
