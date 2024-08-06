import Address from '@/models/Address.model';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const newAddress = await req.json();

        const updateAddress = await Address.findByIdAndUpdate(
            params.id,
            { ...newAddress },
            { new: true }
        );

        return NextResponse.json(updateAddress, {
            status: 200,
            headers: { 'Access-Control-Allow-Origin': '*' },
        });
    } catch (err) {
        console.log('[wishlist_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        await Address.findByIdAndDelete(params.id);

        return NextResponse.json(
            { message: 'Address deleted success' },
            {
                status: 200,
                headers: { 'Access-Control-Allow-Origin': '*' },
            }
        );
    } catch (err) {
        console.log('[wishlist_DELETE]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
