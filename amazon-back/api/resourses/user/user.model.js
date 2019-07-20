import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
    local: {
        email: { type: String, require: true, index: true, unique: true, sparse: true },
        password: String
    },
    google: {
        id: String,
        email: { type: String, require: true, index: true, unique: true, sparse: true },
        displayName: String,
        token: String
    },
    twitter: {
        userName: String,
        id: String,
        token: String,
        displayName: String

    },
    github: {
        email: { type: String, require: true, index: true, unique: true, sparse: true },
        id: String,
        displayName: String,
        token: String,
    }
});

export default mongoose.model('User', UserSchema);