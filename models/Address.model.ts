import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, maxlength: [50, 'Name must be at most 50 characters long'] },
    phone: { type: String },
    postalCode: { type: Number },
    locality: { type: String, maxlength: [50, 'Name must be at most 50 characters long'] },
    address: { type: String, maxlength: [100, 'Name must be at most 100 characters long'] },
    addressType: { type: String, enum: ['home', 'work'], default: 'home' },
    city: { type: String, maxlength: [50, 'Name must be at most 50 characters long'] },
    landmark: { type: String, maxlength: [50, 'Name must be at most 50 characters long'] },
    alternatePhone: { type: String },
});

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

export default Address;
