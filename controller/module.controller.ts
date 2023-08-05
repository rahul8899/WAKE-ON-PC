import { Request, Response } from "express";
import { Module } from "../models/module";

export class moduleController {
    createModule = async (req: Request, res: Response) => {
        const { module_name } = req.body;
        try {
            if (!module_name) {
                res.json({ mesage: "Please enter name" })
            }
            const existingName = await Module.findOne({ where: { module_name } });
            if (existingName) {
                return res.status(201).json({
                    message: "Module is allredy Created."
                })
            }
            const newmodule = await Module.create({ module_name });
            if (newmodule) {
                return res.json({
                    success: true,
                    message: 'Module Created successfully.',
                    data: newmodule
                })
            } else {
                return res.status(404).json({ message: "Error in creating Module" })
            }
        } catch (error) {
            console.log("Error in creating Module", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    selectAllModule = async (req: Request, res: Response) => {
        try {
            const module = await Module.findAll();
            if (module) {
                return res.json({
                    success: true,
                    data: module
                })
            } else {
                res.json({
                    success: false
                })
            }
        } catch (error) {
            console.log("Error in Fetching Module", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    updateModule = async (req: Request, res: Response) => {
        const { module_id } = req.params;
        const { body } = req;

        try {
            // Find the user by id in the database
            const updatedmodel = await Module.findByPk(module_id);
            if (updatedmodel) {
                await updatedmodel.update(body);
                return res.status(200).json({
                    success: true,
                    data: updatedmodel
                })
            } else {
                return res.status(404).json({ message: 'Module not found' });
            }
        } catch (error) {
            console.error('Error updating Module:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    deleteModule = async (req: Request, res: Response) => {
        const { module_id } = req.params;
        try {
            const module = await Module.findByPk(module_id)
            if (module) {
                await module.destroy();
                return res.status(200).json({
                    success: true,
                    message: 'Module deleted successfully'
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Module not found'
                })
            }
        } catch (error) {
            console.error('Error deleting Module:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}