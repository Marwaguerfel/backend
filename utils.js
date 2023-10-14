import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET ||'azertyuiop',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7); // Remove "Bearer "
    jwt.verify(token, process.env.JWT_SECRET || "somethingsecret", (err, decode) => {
      if (err) {
        console.error("Error verifying token:", err);
        res.status(401).send({ message: "Invalid Token" });
      } else {
        console.log("Valid token:", decode);
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};








