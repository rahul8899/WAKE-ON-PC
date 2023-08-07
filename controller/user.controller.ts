import { Request, Response } from "express";
import { Users } from "../models/users";
import { Role } from "../models/role";
import bcrypt from "bcrypt";
import { Sequelize } from "sequelize";

export class userController {
    createUser = async (req: Request, res: Response) => {
        const { user_name, email, role_name, password } = req.body;
        try {
            // check is user is allredy registed or not.
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email is allredy registed."
                })
            };
            // Get the role_id based on the provided role_name
            const role = await Role.findOne({ where: { role_name } });
            if (!role) {
                return res.status(400).json({ message: "Invalid role_name" });
            }
            const role_id = role.role_id;

            // hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                user_name,
                email,
                role_id,
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
    };

    getAllUser = async (req: Request, res: Response) => {
        try {
            const user = await Users.findAll({
                attributes: ["user_id", "user_name", "email", "role_id"],
                include: [{
                    model: Role,
                    attributes: ["role_name"],
                    where: { role_id: Sequelize.col("Users.role_id") }
                }]
            });
            if (user) {
                const userWithRoleNames = user.map((user: any) => {
                    const { user_id, user_name, email, role_id, role: { role_name } } = user;
                    return { user_id, user_name, email, role_id, role_name };
                });
                return res.json({
                    success: true,
                    data: userWithRoleNames
                })
            } else {
                return res.json({ message: "Message not found" })
            }
        } catch (error) {
            console.log("There is error in finding all users", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    updateUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        const { user_name, email, role_name } = req.body;
        try {
            const user = await Users.findByPk(user_id);
            if (user) {
                // Get the role_id based on the provided role_name
                const role = await Role.findOne({ where: { role_name } });
                if (!role) {
                    return res.status(400).json({ message: "Invalid role_name" });
                };
                const role_id = role.role_id;
                // now update the user
                await user.update({ user_name, email, role_id });
                return res.json({
                    success: true,
                    data: user
                })
            } else {
                res.json({
                    success: false,
                    message: "User not found"
                })
            }
        } catch (error) {
            console.log("There is error in updating user", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        const { user_id } = req.params;
        try {
            const user = await Users.findByPk(user_id);
            if (user) {
                await user.destroy();
                return res.json({
                    success: true,
                    message: "User deleted"
                })
            } else {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
        } catch (error) {
            console.log("There is error in deleting user", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

}