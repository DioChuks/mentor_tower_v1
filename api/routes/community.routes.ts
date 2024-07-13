import { Router } from 'express';
import validate from "../app/validations/validate/_validate.middleware";
import IsAuth from '../app/middleware/auth';
import * as commValidation from "../app/validations/community";
import { createCommunity, getCommunities, getCommunityById, updateCommunity, deleteCommunity } from '../app/controllers/community.controller';

const router = Router();

router.use(IsAuth())

router.post('/', validate(commValidation.newCommPost), createCommunity);
router.get('/', getCommunities);
router.get('/post/:id', getCommunityById);
router.patch('/post/:id', validate(commValidation.updateCommPost), updateCommunity);
router.delete('/post/:id', deleteCommunity);

export default router;
