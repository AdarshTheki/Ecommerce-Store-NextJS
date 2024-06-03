import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        userId: String,
        review: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                comment: { type: String, required: true, trim: true },
                rating: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
