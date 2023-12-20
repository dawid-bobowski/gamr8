import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, param, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

interface QueryFilters {
  author_username: string;
  game_id?: number;
}

// GET /api/reviews/user
// GET /api/reviews/user?gameId=123
router.get('/api/reviews/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const gameId = req.query.gameId as string | undefined;
    const queryFilter: QueryFilters = {
      author_username: username,
    }
    if (!gameId) {
      const reviews = await prisma.review.findMany({
        where: queryFilter,
      });
      if (reviews) {
        return res.status(200).json({
          success: true,
          message: 'Reviews found',
          reviews,
        });
      }
      return res.status(404).json({
        message: 'There are no reviews yet',
      });
    }
    queryFilter.game_id = parseInt(gameId);
    const review = await prisma.review.findFirst({
      where: queryFilter,
    });
    if (review) {
      return res.status(200).json({
        success: true,
        message: 'Review found',
        review,
      });
    }
    return res.status(404).json({
      message: 'Review not found',
    });
  } catch (error) {
    console.error('Error fetching user reviews: ', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

router.post('/api/reviews/create',
  body('username').exists().isString(),
  body('gameSlug').exists().isString(),
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('rating').exists().isNumeric(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed request data validation',
      });
    }
    try {
      const game = await prisma.game.findFirst({
        where: {
          slug: req.body.gameSlug,
        },
      });
      if (!game) {
        return res.status(404).json({
          message: 'Game not found',
        });
      }
      const review = await prisma.review.findFirst({
        where: {
          game_id: game.id,
        },
      });
      if (review) {
        return res.status(409).json({
          message: 'Review already exists',
        });
      }

      const {
        username,
        title,
        description,
        rating,
      } = req.body;

      const newReview = await prisma.review.create({
        data: {
          author_username: username,
          game_id: game.id,
          title,
          description,
          rating,
        },
      });
      if (newReview) {
        return res.status(201).json({
          success: true,
          message: 'Review added successfully',
          review: newReview,
        });
      }
      return res.status(500).json({
        message: 'Failed to create a new review',
      });
    } catch (error) {
      console.error('Error creating a new review: ', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
});

router.patch('/api/reviews/update/:username/:gameSlug',
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('rating').exists().isNumeric(),
  body('reviewId').exists().isNumeric(),
  param('gameSlug').exists().isString(),
  param('username').exists().isString(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        message: 'Failed request data validation',
      });
    }
    try {
      const reviewId = req.body.reviewId;
      if (!reviewId) {
        return res.status(404).json({
          message: 'No review ID was provided in the request',
        });
      }
      const intReviewId = parseInt(reviewId);
      if (isNaN(intReviewId)) {
        return res.status(404).json({
          message: 'Provided review ID is not a number',
        });
      }
      const review = await prisma.review.findFirst({
        where: {
          id: intReviewId,
        },
      });
      if (!review) {
        return res.status(404).json({
          message: 'Review doesn\'t exist',
        });
      }

      const {
        title,
        description,
        rating,
      } = req.body;

      const newReview = await prisma.review.update({
        where: {
          id: review.id,
        },
        data: {
          author_username: req.params?.username,
          title,
          description,
          rating,
        },
      });
      if (newReview) {
        return res.status(200).json({
          success: true,
          message: 'Review updated successfully',
          review: newReview,
        });
      }
      return res.status(500).json({
        message: 'Failed to edit the review',
      });
    } catch (error) {
      console.error('Error updating the review: ', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
});

export default router;
