import { Request, Response, Router } from 'express';
import { Game, PrismaClient } from '@prisma/client';

interface GamesQueryFilter {
  where?: {
    title: {
      contains?: string;
    }
  }
  take?: number;
  orderBy?: {
    id: 'asc' | 'desc';
  }
}

const router = Router();
const prisma = new PrismaClient();

router.get('/api/games', async (req: Request, res: Response) => {
  try {
    const gamesQueryFilter: GamesQueryFilter = {};
    const query: string = req.query.q as string ?? '';
    const limit: number | null = req.query.limit ?
      parseInt(req.query.limit as string) :
      null;

    if (query) {
      gamesQueryFilter.where = {
        title: {
          contains: query,
        },
      };
    }
    
    if (limit) {
      gamesQueryFilter.take = limit;
      gamesQueryFilter.orderBy = {
        id: 'desc',
      };
    }

    const games: Game[] = await prisma.game.findMany(gamesQueryFilter);

    return res.status(200).json({
      games,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      message: `Internal Server Error: ${error}`,
    });
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
      return res.status(200).json({
        game,
      });
    }

    return res.status(404).json({
      message: 'Game not found',
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    return res.status(500).json({
      message: `Internal Server Error: ${error}`,
    });
  }
});

router.post('/api/games', async (req, res) => {
  try {
    const {
      title,
      description,
      year,
      slug,
    } = req.body;
    const newGame = await prisma.game.create({
      data: {
        title,
        description,
        year,
        slug,
      },
    });

    if (!newGame) {
      return res.status(409).json({
        message: 'Game already exists',
      });
    }

    return res.status(201).json({
      game: newGame,
    });
  } catch (error) {
    console.error('Error creating new game:', error);
    return res.status(500).json({
      message: `Internal Server Error: ${error}`,
    });
  }
});


export default router;
