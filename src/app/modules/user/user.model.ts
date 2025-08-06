import { model, Schema, Types } from "mongoose";
import { ISactive, IUser, Role } from "./user.interface";
import { object, string } from "zod";

const authProviderSchema = new Schema<ISactive>(
  {
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const userSchema = new Schema<IUser>(
  {
  
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActive: {
      type: String,
      enum: Object.values(ISactive),
      default: ISactive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    auths: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);



export const User = model<IUser>("User",userSchema);
