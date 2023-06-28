import { Request, Response } from "express";
import selectTaskById from "../data/selectTaskById";
import moment from "moment";

export default async function createtask(
    req: Request, 
    res: Response
) {
    try{
        //validar entradas da requisição
        const result = await selectTaskById(req.params.id)
        
        if(!result){
            res.status(404).send({
                message: "Task not found!"
            })

            return
        }


        res.status(200).send({
            id: result.id,
            title: result.title,
            description: result.description,
            deadline: result.deadline,
            status: result.status,
            author_id: result.author_id,
            nickname: result.nickname
        })

    } catch (err: any){
        res.status(400).send({
            message: err.message || err.sqlMessage
        })
    }
}