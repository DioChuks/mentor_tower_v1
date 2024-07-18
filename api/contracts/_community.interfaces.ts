import { Types } from 'mongoose';

export interface IComment {
  user: Types.ObjectId;
  comment: string;
  createdAt: Date;
}

export interface ICommunity {
  name: string;
  tier: string;
  content: string;
  likes: number;
  comments: IComment[];
  no_of_tagged: number;
}

export type NewCreatedCommPost = Omit<ICommunity, 'likes' | 'comments' | 'no_of_tagged'>;