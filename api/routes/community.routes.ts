import { Router } from 'express';
import validate from "../app/validations/validate/_validate.middleware";
import { GateRoute } from '../app/middleware/auth';
import validateCommunityPost from '../app/validations/validate/validateMiddleware';
import { updateCommPost } from '../app/validations/community';
import { createCommunityPost, getCommunities, getCommunityById, updateCommunity, deleteCommunity } from '../app/controllers/community.controller';

const commRouter = Router();

commRouter.use(GateRoute)

commRouter.post('/', validateCommunityPost, createCommunityPost);
commRouter.get('/', getCommunities);
commRouter.get('/post/:id', getCommunityById);
commRouter.patch('/post/:id', validate(updateCommPost), updateCommunity);
commRouter.delete('/post/:id', deleteCommunity);

export default commRouter;
