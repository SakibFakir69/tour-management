import { Types } from "mongoose";
import { string } from "zod";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

// auth provider

export interface IAuthProvider {
  provider: "google" | "credintails";
  providerId: string;
}

// status check

export enum ISactive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

// user login

export interface IUser {
    _id?:Types.ObjectId,
  name: string;

  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: ISactive;
  isVerified?: string;

  auths: IAuthProvider[];
  role: Role;
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}


