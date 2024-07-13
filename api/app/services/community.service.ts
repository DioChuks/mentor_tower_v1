import Community from '../models/community';
import { ICommunity, NewCreatedCommPost } from '../../contracts/_community.interfaces';

export class CommunityService {
    async createCommunity(data: NewCreatedCommPost): Promise<ICommunity> {
        console.log('Data to be saved:', data); // Log the data to be saved
        const community = new Community(data);
        return community.save();
    }

    async getCommunities(): Promise<ICommunity[]> {
        return Community.find().exec();
    }

    async getCommunityById(id: string): Promise<ICommunity | null> {
        return Community.findById(id).exec();
    }

    async updateCommunity(id: string, data: Partial<ICommunity>): Promise<ICommunity | null> {
        return Community.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteCommunity(id: string): Promise<ICommunity | null> {
        return Community.findByIdAndDelete(id).exec();
    }
}
