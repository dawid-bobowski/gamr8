import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'very-secret-key';

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // WARNING: Remove the following line in production!
    console.log(hashedPassword);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({
      message: 'User was successfully created',
      success: true,
      user: { id: newUser.id, username, email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: 86400,
    });
    return res.status(200).json({ success: true, accessToken: token, user: { id: user.id, username: username } });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  // Typically, logging out on the server side means invalidating the token.
  // Since JWT is stateless and if you're not using a token blacklist,
  // logout is often handled on the client side by simply removing the token from client storage.
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
