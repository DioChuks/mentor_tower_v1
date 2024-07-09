import { Schema, model, ObjectId } from 'mongoose'
import validator from 'validator';
import {UserRole} from "@/@types/_role";
import toJSON from '@/app/config/_toJson';
import { compareSync, hash } from 'bcrypt'
import { IUserDoc, IUserModel } from "@/@types/_user.interfaces";

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
        required: true
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

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.static('isEmailTaken', async function (email: string, excludeUserId: ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  });

UserSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password)
}

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await hash(user.password, 8);
    }
    next();
});

const User = model<IUserDoc, IUserModel>('User', UserSchema);

export default User;