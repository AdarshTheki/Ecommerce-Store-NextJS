import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkId: {
            type: String,
            unique: true,
            required: [true, 'Un-Authorize user, Please try again to login'],
        },
        name: { type: String },
        wishlist: {
            type: Array,
            default: [],
        },
        review: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
