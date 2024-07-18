import { Schema, model, Types } from 'mongoose';
import { ICommunity } from '../../contracts/_community.interfaces';

const CommentSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CommunitySchema = new Schema<ICommunity>({
  name: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [CommentSchema],
  no_of_tagged: {
    type: Number,
    required: false
  }
}, { timestamps: true });

const Community = model<ICommunity>('Community', CommunitySchema);

export default Community;
