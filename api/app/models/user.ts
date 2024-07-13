import { Schema, model, ObjectId } from 'mongoose'
import validator from 'validator';
import {UserRole} from "../../contracts/_role";
import toJSON from '../config/_toJson';
import { compare, hash } from 'bcrypt'
import { IUserDoc, IUserModel } from "../../contracts/_user.interfaces";

const UserSchema = new Schema<IUserDoc, IUserModel>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
            throw new Error('Invalid email');
            }
        },
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.Mentee
    },
    dob: {
        type: Date,
        required: false,
    },
    bio: {
        type: String,
        required: false
    },
    tier: {
        type: String,
        required: false
    }
}, { timestamps: true });

UserSchema.plugin(toJSON);

UserSchema.static('isEmailTaken', async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  });

UserSchema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
    const user = this as IUserDoc;
    return compare(password, user.password);
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await hash(user.password, 8);
    }
    next();
});

const User = model<IUserDoc, IUserModel>('User', UserSchema);

export default User;