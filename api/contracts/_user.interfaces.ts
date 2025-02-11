import mongoose, { Model, Document } from 'mongoose';
import { AccessAndRefreshTokens } from './_token.interfaces';
import { QueryResult } from './_paginate';

export interface IUser {
  name: string;
  email: string;
  phone: number;
  bio: string;
  dob: Date;
  tier: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
  areaOfInterest: string;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;

export type NewRegisteredUser = Omit<IUser, 'bio' | 'isEmailVerified' | 'dob' | 'tier' | 'phone' | 'areaOfInterest'>;

export type NewCreatedUser = Omit<IUser, 'isEmailVerified'>;

export interface IUserWithTokens {
  user: IUserDoc;
  tokens: AccessAndRefreshTokens;
}
