import { Request, Response } from "express";
import { Users } from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config()

export const JWT_SECRET = "rahulkaklotar";
export class authController {
    registerUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            // check is user is allredy registed or not.
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email is allredy registed."
                })
            };

            // hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                email,
                password: hashedPassword,
            });
            return res.status(201).json({
                message: "User registed successfully",
                newUser
            });
        } catch (error) {
            console.log("Error in registering user", error);
            return res.status(500).json({
                message: "Enternal server Error"
            });
        }
    }

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
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

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
