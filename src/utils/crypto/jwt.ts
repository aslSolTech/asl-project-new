import jwt, { type SignOptions, type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET, JWT_SECRET_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN } from "../../config/dotenv/dotenv.js";

export interface CustomJwtPayload extends JwtPayload {
  id?: string;
  role?: string;
}

const accessTokenOptions: SignOptions = {
  expiresIn: JWT_SECRET_EXPIRES_IN as NonNullable<SignOptions['expiresIn']>,
};

const refreshTokenOptions: SignOptions = {
  expiresIn: JWT_REFRESH_EXPIRES_IN as NonNullable<SignOptions['expiresIn']>,
};

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, accessTokenOptions);
};

export const generateRefreshToken = (payload: CustomJwtPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, refreshTokenOptions);
};

export const verifyToken = (token: string): CustomJwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  if (typeof decoded === "string") throw new Error("Invalid token payload");
  return decoded as CustomJwtPayload;
};

export const verifyRefreshToken = (token: string): CustomJwtPayload => {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  if (typeof decoded === "string") throw new Error("Invalid refresh token payload");
  return decoded as CustomJwtPayload;
};