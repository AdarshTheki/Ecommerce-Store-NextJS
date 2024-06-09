import User from '@/lib/User.model';
import { connectToDB } from '@/lib/mongoDB';

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        await connectToDB();

        let user = await User.findOne({ clerkId: userId });

        // When the user sign-in for the 1st, immediately we will create a new user for them
        if (!user && userId.includes('user_')) {
            user = new User({ clerkId: userId });
            await user.save();
        }

        const { productId } = await req.json();

        if (!productId) {
            return new NextResponse('Product Id required', { status: 400 });
        }

        const isLiked = user.wishlist.includes(productId);

        if (isLiked) {
            // Dislike
            user.wishlist = user.wishlist.filter((id: string) => id !== productId);
        } else {
            // Like
            user.wishlist.push(productId);
        }

        await user.save();

        return NextResponse.json(user, {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[wishlist_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
