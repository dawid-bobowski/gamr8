import mongoose, { Schema, Document } from 'mongoose';

// Define the User Document interface
export interface IUser extends Document {
    name: string;
    email: string;
    // Add other fields as needed
}

// Define the User schema
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // Add other fields as needed
});

// Create and export the User model
export default mongoose.model<IUser>('User', UserSchema);