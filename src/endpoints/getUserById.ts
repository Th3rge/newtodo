import { Request, Response } from "express";
import selectUserById from "../data/selectUserById";

export default async function createUser(
    req: Request, 
    res: Response
) {
    try{
        //validar entradas da requisição
        const user = await selectUserById(req.params.id)
        
        if(!user){
            res.status(404).send({
                message: "Usuário não encontrado!"
            })

            return
        }


        res.status(200).send({
            message: "Sucesso!",
            id: user.id,
            nickname: user.nickname
        })

    } catch (err: any){
        res.status(400).send({
            message: err.message || err.sqlMessage
        })
    }
}