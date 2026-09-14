import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET || 'tomato_food_delivery_secret_jwt_key_2026');
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.error('Auth verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
  }
};

export default authMiddleware;
