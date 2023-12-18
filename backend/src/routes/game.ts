import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/api/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    return res.status(200).json({ games });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/games/:slug', async (req, res) => {
  try {
    const slug: string = req.params.slug;
    const game = await prisma.game.findUnique({
      where: {
        slug,
      },
    });
    if (game) {
      return res.status(200).json({ message: 'Game found', game });
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/api/games', async (req, res) => {
  try {
    const { title, description, year, slug } = req.body;
    const newGame = await prisma.game.create({
      data: {
        title,
        description,
        year,
        slug,
      },
    });
    res.status(201).json({ message: 'Game created successfully', newGame });
  } catch (error) {
    console.error('Error creating new game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
