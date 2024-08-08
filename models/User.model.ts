import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            unique: true,
            required: true,
        },
        name: String,
        email: String,
        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
        wishlist: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
