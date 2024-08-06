import mongoose, { Schema } from 'mongoose';

const reviewSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        productId: { type: String, required: [true, 'Please provide a productId'] },
        comment: {
            type: String,
            required: [true, 'Please provide a comment text'],
            minlength: [10, 'Check minimum 10 char at least'],
            maxlength: [100, 'Check maximum 100 char at least'],
            trim: true,
        },
        rating: { type: Number, required: [true, 'Please provide a rating star'] },
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
