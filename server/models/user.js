import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followers: {
        type: [String],
        default: [],
    },
    id: { type: String },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

export default mongoose.model("User", userSchema);