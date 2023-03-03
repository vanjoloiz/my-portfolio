import jwt from 'jsonwebtoken';
import Profile from '../models/Profile';

export const authMiddleware = async (req: any, res: any, next: any) => {
  let token;

  try {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized');
    }

    token = req.headers.authorization;

    const { userId }: any = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = userId;
    req.user = await Profile.findById(userId).select('-password');

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Unauthorized');
  }
};

export const adminMiddleware = (req: any, res: any, next: any) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};
