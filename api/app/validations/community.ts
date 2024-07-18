import Joi from 'joi';
import { postSize } from './validate/_custom.validation';
import { NewCreatedCommPost } from '../../contracts/_community.interfaces';

const communityBody: Record<keyof NewCreatedCommPost, any> = {
    name: Joi.string().required(),
    tier: Joi.string().required(),
    content: Joi.string().required().custom(postSize)
};

export const newCommPost = {
  body: Joi.object().keys(communityBody),
};

export const updateCommPost = {
  body: Joi.object().keys({
    content: Joi.string().required()
  }),
};

export const commentSchema = {
  body: Joi.object().keys({
      user: Joi.string().required(),
      comment: Joi.string().required()
  })
};