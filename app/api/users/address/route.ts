import { connectToDB } from '@/lib/mongoDB';
import { auth } from '@clerk/nextjs/server';

import { NextRequest, NextResponse } from 'next/server';
import Address from '@/models/Address.model';

export const GET = async (req: NextRequest) => {
    try {
        // const userId = 'user_2h3lpm7Ce3lZrtLm7AHgKh2w3Rc';
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized User, Please Login Your Account' },
                { status: 401 }
            );
        }
        await connectToDB();

        const newAddress = await Address.find({ userId });

        return NextResponse.json(newAddress, {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[users_GET]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        // const userId = 'user_2h3lpm7Ce3lZrtLm7AHgKh2w3Rc';
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized User, Please Login Your Account' },
                { status: 401 }
            );
        }
        await connectToDB();

        const data = await req.json();

        const newAddress = await Address.create({ userId, ...data });

        return NextResponse.json(newAddress, {
            status: 201,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[users_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
