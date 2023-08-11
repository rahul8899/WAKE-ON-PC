import { Request, Response } from "express";
import { Users } from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config()


const JWT_SECRET: any = process.env.JWT_SECRET || 'rahulkaklotar';

export class authController {

    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            // Find the user by email
            let user = await Users.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid credentials" })
            }

            // Generate a JWT token and send it in the response
            const token = jwt.sign({ userId: user.user_id }, JWT_SECRET);
            // const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "1h" });

            return res.status(200).json({
                message: "Login successful",
                user: { user_id: user.user_id, email: user.email },
                token,
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
