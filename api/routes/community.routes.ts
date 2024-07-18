import { Router } from 'express';
import validate from "../app/validations/validate/_validate.middleware";
import { GateRoute } from '../app/middleware/auth';
import validateCommunityPost from '../app/validations/validate/validateMiddleware';
import { commentSchema, updateCommPost } from '../app/validations/community';
import { createCommunityPost, getCommunities, getCommunityById, updateCommunity, deleteCommunity, likeCommunityPost, commentOnCommunityPost } from '../app/controllers/community.controller';

const commRouter = Router();

commRouter.use(GateRoute)

commRouter.post('/', validateCommunityPost, createCommunityPost);
commRouter.get('/', getCommunities);
commRouter.get('/post/:id', getCommunityById);
commRouter.patch('/post/:id', validate(updateCommPost), updateCommunity);
commRouter.delete('/post/:id', deleteCommunity);

commRouter.post('/:id/like', likeCommunityPost);
commRouter.post('/:id/comment', validate(commentSchema), commentOnCommunityPost);

export default commRouter;
