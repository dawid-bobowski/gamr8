import { Router } from 'express';
import { PrismaClient, User } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      error: 'Internal Server Error: unable to retrieve users from the database',
    });
  }
});

router.get('/api/user/:username', async (req, res) => {
  try {
    const username: string = req.params.username;
    const user: User | null = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      return res.status(200).json({
        success: true,
        message: 'User found',
        user,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'User not found',
      user: null,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'Internal Server Error: unable to retrieve user info from the database',
    });
  }
});

export default router;
