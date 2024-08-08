import Address from '@/models/Address.model';
import { connectToDB } from '@/lib/mongoDB';
import { NextRequest, NextResponse } from 'next/server';
import { configHeaders } from '@/lib/constant';

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const newAddress = await req.json();

        const updateAddress = await Address.findByIdAndUpdate(
            params.id,
            { ...newAddress },
            { new: true }
        );
        if (!updateAddress) throw Error('[address_id_POST] address not updated on database');

        return NextResponse.json(updateAddress, configHeaders);
    } catch (err) {
        console.log('[wishlist_POST]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        const deleteAddress = await Address.findByIdAndDelete(params.id);
        if (!deleteAddress) throw Error('[address_id_DELETE] address not deleted on database');

        return NextResponse.json(deleteAddress, configHeaders);
    } catch (err) {
        console.log('[wishlist_DELETE]', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
};
