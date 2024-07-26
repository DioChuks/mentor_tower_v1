import { Document, Types } from 'mongoose';

export interface IMeeting extends Document {
    title: string;
    description: string;
    scheduledBy: Types.ObjectId;
    scheduledFor: Types.ObjectId;
    scheduledAt: Date;
    duration: number; // in minutes
    location: string; // can be a link or a physical location
    status: 'scheduled' | 'completed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}

export type NewMeeting = Omit<IMeeting, 'status' | 'createdAt' | 'updatedAt'>;
