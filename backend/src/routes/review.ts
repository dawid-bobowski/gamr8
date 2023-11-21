import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

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

export default router;
