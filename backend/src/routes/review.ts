import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, param, validationResult } from 'express-validator';

const router = Router();
const prisma = new PrismaClient();

router.get('/api/reviews/user/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const reviews = await prisma.review.findMany({
      where: {
        author_id: id,
      },
    });
    if (reviews) {
      return res.status(200).json({ message: 'Reviews found', reviews });
    } else {
      res.status(404).json({ message: 'There are no reviews yet' });
    }
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/reviews/create',
  body('authorId').exists().isNumeric(),
  body('gameSlug').exists().isString(),
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('rating').exists().isNumeric(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ message: 'Failed request data validation' });
    }
    try {
      const game = await prisma.game.findFirst({
        where: {
          slug: req.body.gameSlug,
        },
      });
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      const review = await prisma.review.findFirst({
        where: {
          game_id: game.id,
        },
      });
      if (review) {
        return res.status(409).json({ message: 'Review already exists' });
      }
      const { authorId, title, description, rating } = req.body;
      const newReview = await prisma.review.create({
        data: {
          author_id: authorId,
          game_id: game.id,
          title,
          description,
          rating,
        },
      });
      if (newReview) {
        res.status(201).json({
          success: true,
          message: 'Review added successfully',
          review: newReview,
        });
      } else {
        return res.status(500).json({ message: 'Failed to create a new review' });
      }
    } catch (error) {
      console.error('Error creating a new review:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/api/reviews/update/:id',
  body('authorId').exists().isNumeric(),
  body('title').exists().isString(),
  body('description').exists().isString(),
  body('rating').exists().isNumeric(),
  param('id').exists().isNumeric(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ message: 'Failed request data validation' });
    }
    try {
      const gameId = req.params?.id;
      if (!gameId) {
        return res.status(404).json({ message: 'No review ID was provided in the request' });
      }
      const intGameId = parseInt(gameId);
      if (isNaN(intGameId)) {
        return res.status(404).json({ message: 'Provided review ID is not a number' });
      }
      const review = await prisma.review.findFirst({
        where: {
          game_id: intGameId,
        },
      });
      if (!review) {
        return res.status(404).json({ message: 'Review doesn\'t exist' });
      }
      const { authorId, title, description, rating } = req.body;
      const newReview = await prisma.review.update({
        where: {
          id: review.id,
        },
        data: {
          author_id: authorId,
          game_id: gameId,
          title,
          description,
          rating,
        },
      });
      if (newReview) {
        res.status(200).json({
          success: true,
          message: 'Review updated successfully',
          review: newReview,
        });
      } else {
        return res.status(500).json({ message: 'Failed to edit the review' });
      }
    } catch (error) {
      console.error('Error updating the review:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
