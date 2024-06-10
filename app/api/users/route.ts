import User from '@/lib/User.model';
import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectToDB();

        let user = await User.findOne({ clerkId: userId });

        // When the user sign-in for the 1st, immediately we will create a new user for them
        if (!user && userId.includes('user_')) {
            user = new User({ clerkId: userId });
            await user.save();
        }

        return NextResponse.json(user, {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[users_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const dynamic = 'force-dynamic';
