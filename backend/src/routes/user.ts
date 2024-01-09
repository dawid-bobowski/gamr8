import { NextFunction, Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer, { MulterError } from 'multer';
import SFTPClient from 'ssh2-sftp-client';
import { Readable } from 'stream';
import * as fs from 'fs';

const router = Router();
const prisma = new PrismaClient();
const avatarUpload = multer({ storage: multer.memoryStorage() });
const supportedAvatarExtensions = ['jpg', 'png'];

const getFileExtension = (filename: string): string => {
  if (filename.lastIndexOf('.') === -1) return '';
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

const uploadToSFTP = async (file: Express.Multer.File, newFileUrl: string): Promise<boolean> => {
  const sftp = new SFTPClient();

  try {
    await sftp.connect({
      host: process.env.SFTP_HOST,
      port: 40022,
      username: process.env.SFTP_USERNAME,
      password: process.env.SFTP_PASSWORD,
    });

    const fileStream = file.buffer ? Readable.from(file.buffer) : fs.createReadStream(file.path);
    const result = await sftp.put(fileStream, newFileUrl);
  
    if (!result) {
      return false;
    }
    return true;
  } catch (error) {
      console.error('Error while processing user avatar during upload process:', error);
      return false;
  } finally {
    sftp.end();
  }
}

const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
  avatarUpload.single('file')(req, res, function (err) {
      if (err instanceof MulterError) {
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
              return res.status(400).send({
                message: 'Only one file is allowed',
              });
          }

          return res.status(400).send({
            message: err.message,
          });
      } else if (err) {
        return res.status(500).send({
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).send({
          message: 'No file uploaded',
        });
      }

      next();
  });
}

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
    const userWithRecentReviews = await prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        username: true,
        email: true,
        avatarUrl: true,
        reviews: {
          take: 3,
          orderBy: {
            date_posted: 'desc',
          },
        },
      },
    });

    if (userWithRecentReviews) {
      return res.status(200).json({
        success: true,
        message: 'User found',
        user: userWithRecentReviews,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User doesn\'t exist',
      user: null,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'Internal Server Error: unable to retrieve user info from the database',
    });
  }
});

router.post('/api/users/:username/upload-avatar', uploadHandler, async (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: 'No file uploaded',
    });
  }

  try {
    const fileExtension = getFileExtension(req.file.originalname);
  
    if (!supportedAvatarExtensions.includes(fileExtension)) {
      return res.status(400).send({
        message: 'Unsupported file extension. Supported extensions are .jpg and .png',
      });
    }

    const username = req.params.username;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const sftpAvatarUrl = `${process.env.SFTP_AVATARS_DEST}${username}.${getFileExtension(req.file.originalname)}`;
    const uploaded = uploadToSFTP(req.file, sftpAvatarUrl);

    if(!uploaded) {
      return res.status(500).json({
        message: 'Failed to properly process avatar upload',
      });
    }

    const webAvatarUrl = `https://gamr8.net/users/avatars/${username}.${getFileExtension(req.file.originalname)}`;
    const newAvatar = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatarUrl: webAvatarUrl,
      },
    });

    if (newAvatar) {
      return res.status(201).json({
        success: true,
        message: 'Avatar uploaded successfully',
        avatarUrl: webAvatarUrl,
      });
    }
    return res.status(500).json({
      message: 'Failed to update the user avatar',
    });
  } catch (error) {
    console.error('Error uploading new user avatar: ', error);
    return res.status(500).json({
      error: 'Internal Server Error: unable to upload user avatar',
    });
  }
});

export default router;
