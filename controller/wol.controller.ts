import e, { Request, Response } from "express";
import { Wol } from "../models/wol";
import * as dotenv from "dotenv";
import wakeOnLan from "wake_on_lan";
import { any } from "joi";
dotenv.config();

export class wolController {
    wakeup = async (req: Request, res: Response) => {
        const { MAC, ip } = req.body;
        try {
            wakeOnLan.wake(MAC, function (error: any) {
                if (error) {
                    // err:any=error;
                    console.log("Failed to send packets");// handle error
                    res.status(500);
                    res.send('Failed to send packets...');
                } else {
                    console.log("Packets sent");// done sending packets
                    res.status(200);
                    res.send('Success, packets sent, PC should power on...');
                }
            });

        } catch (error) {
            console.log("Error is : ", error);
            res.json({
                message: "error in calling wakeup function."
            })
        }
    }
}