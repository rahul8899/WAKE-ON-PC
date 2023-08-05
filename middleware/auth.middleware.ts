import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'rahulkaklotar';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.json({ message: "Token is missing" });
    }
    try {
        const decodToken = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decodToken.userId;
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        return res.json({ message: "Invalid token" });
    }
}