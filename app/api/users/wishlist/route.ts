import User from '@/models/User.model';
import { connectToDB } from '@/lib/mongoDB';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { configHeaders } from '@/lib/constant';

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) throw Error('[wishlist_POST] Un-Authorize user ! please login');

        await connectToDB();

        let user = await User.findOne({ clerkId: userId });

        // When the user sign-in for the 1st, immediately we will create a new user for them
        if (!user && userId.includes('user_')) {
            const clerkUser = await clerkClient.users.getUser(userId);
            user = new User({ clerkId: userId, name: clerkUser.fullName });
            await user.save();
        }

        const { productId } = await req.json();

        if (!productId) throw Error('Product ID required');

        const isLiked = user.wishlist.includes(productId);

        if (isLiked) {
            // Dislike
            user.wishlist = user.wishlist.filter((id: string) => id !== productId);
        } else {
            // Like
            user.wishlist.push(productId);
        }

        await user.save();

        if (!user) throw Error('[wishlist_POST] user not updated on database');

        return NextResponse.json(user, configHeaders);
    } catch (err) {
        console.log('[wishlist_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
