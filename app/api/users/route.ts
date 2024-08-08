import User from '@/models/User.model';
import { connectToDB } from '@/lib/mongoDB';
import { auth, clerkClient } from '@clerk/nextjs/server';

import { NextRequest, NextResponse } from 'next/server';
import { configHeaders } from '@/lib/constant';

export const GET = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized User, Please Login Your Account' },
                { status: 401 }
            );
        }

        await connectToDB();

        let user = await User.findOne({ clerkId: userId });

        // When the user sign-in for the 1st, immediately we will create a new user for them
        if (!user && userId.includes('user_')) {
            const clerkUser = await clerkClient.users.getUser(userId);
            user = new User({ clerkId: userId, name: clerkUser.fullName });
            await user.save();
        }

        return NextResponse.json(user, configHeaders);
    } catch (err) {
        console.log('[users_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
