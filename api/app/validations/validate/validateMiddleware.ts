import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/_ApiError';

// Set up multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/') && !file.mimetype.startsWith('video/')) {
      return cb(new ApiError(StatusCodes.BAD_REQUEST, 'Only image and video files are allowed'));
    }
    cb(null, true);
  },
}).single('content');

const validateCommunityPost = (req: Request, res: Response, next: NextFunction): void => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    const { name, tier } = req.body;

    // Validate name
    if (!name || typeof name !== 'string') {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Name is required and must be a string'));
    }

    // Validate tier
    if (!tier || typeof tier !== 'string') {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Tier is required and must be a string'));
    }

    // Validate post_content: it should be either a string or a file
    if (!req.file && (!req.body.content || typeof req.body.content !== 'string')) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Post content is required and must be a string or a file'));
    }

    // If all validations pass, move to the next middleware
    return next();
  });
};

export default validateCommunityPost;
