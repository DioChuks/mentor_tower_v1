import { Router } from 'express';
import validate from "../app/validations/validate/_validate.middleware";
import { GateRoute } from '../app/middleware/auth';
import * as commValidation from "../app/validations/community";
import { createCommunity, getCommunities, getCommunityById, updateCommunity, deleteCommunity } from '../app/controllers/community.controller';

const commRouter = Router();

commRouter.use(GateRoute)

commRouter.post('/', validate(commValidation.newCommPost), createCommunity);
commRouter.get('/', getCommunities);
commRouter.get('/post/:id', getCommunityById);
commRouter.patch('/post/:id', validate(commValidation.updateCommPost), updateCommunity);
commRouter.delete('/post/:id', deleteCommunity);

export default commRouter;
