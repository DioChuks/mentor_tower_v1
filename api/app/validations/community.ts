import Joi from 'joi';
import { postSize } from './validate/_custom.validation';
import { NewCreatedCommunity } from '../../contracts/_community.interfaces';


const communityBody: Record<keyof NewCreatedCommunity, any> = {
  tier: Joi.string().required().email(),
  post_content: Joi.string().required().custom(postSize),
  name: Joi.string().required(),
};

export const newCommPost = {
  body: Joi.object().keys(communityBody),
};

export const updateCommPost = {
  body: Joi.object().keys({
    post_content: Joi.string().required()
  }),
};
