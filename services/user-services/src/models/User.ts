import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  Admin = "Admin",
  CustOps = "CustOps",
  Analyst = "Analyst",
  Purchaser = "Purchaser",
}

export interface AddressUser {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: AddressUser;
  role: UserRole;
}

const AddressSchema: Schema = new Schema<AddressUser>({
  addressLine1: { type: String, required: true, trim: true },
  addressLine2: { type: String, trim: true },
  city: { type: String, required: true, trim: true },
  state: { type: String, required: true, trim: true },
  zip: { type: String, required: true },
});

const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    address: { type: AddressSchema },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.Purchaser,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
