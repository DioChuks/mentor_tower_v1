// src/controllers/community.controller.ts
import { Request, Response } from 'express';
import catchAsync from '../utils/_catchAsync';
import { CommunityService } from '../services/community.service';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const communityService = new CommunityService();

export const createCommunity = catchAsync(async (req: Request, res: Response) => {
    
    try {
        console.log('Request Body:', req.body);
        const community = await communityService.createCommunity(req.body);
        res.status(StatusCodes.CREATED).json(community);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
});

export const getCommunities = catchAsync(async (_req: Request, res: Response) => {
    try {
        const communities = await communityService.getCommunities();
        res.status(StatusCodes.CREATED).json(communities);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
});

export const getCommunityById = catchAsync(async (req: Request, res: Response) => {
    try {
        const community = await communityService.getCommunityById(req.params.id);
        if (!community) {
            return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json(community);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
});

export const updateCommunity = catchAsync(async (req: Request, res: Response) => {
    try {
        const community = await communityService.updateCommunity(req.params.id, req.body);
        if (!community) {
            return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json(community);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
});

export const deleteCommunity = catchAsync(async (req: Request, res: Response) => {
    try {
        const community = await communityService.deleteCommunity(req.params.id);
        if (!community) {
            return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
        res.status(StatusCodes.OK).json(community);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }
});
