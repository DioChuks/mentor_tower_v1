import { Schema, model } from 'mongoose'
import { ICommunity } from '../../contracts/_community.interfaces';

const CommunitySchema = new Schema<ICommunity>({
    name: {
        type: String,
        required: true
    },
    tier: {
        type: String,
        default: false,
    },
    post_content: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false,
    },
    no_of_tagged: {
        type: Number,
        required: false
    }
}, { timestamps: true });


const Community = model<ICommunity>('Community', CommunitySchema);

export default Community;