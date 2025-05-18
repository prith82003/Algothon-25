import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const hasDiscordToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies["Authorization"]) {
    res.status(401).json("Please log in via discord first!");
    return;
  }
  try {
    const authData = await verifyJWT(req.cookies["Authorization"]);
    req.authData = authData;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyJWT = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
};

export default hasDiscordToken;
