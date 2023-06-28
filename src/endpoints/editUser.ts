import { Request, Response } from "express";
import insertUser from "../data/insertUser";
import updateUser from "../data/updateUser";

export default async function createUser(
    req: Request, 
    res: Response
) {
    try{
        
        if(
            req.body.name === "" ||
            req.body.nickname === "" ||
            req.body.email === ""
        ){
            res.status(400).send({
                message: "All fields are required"
            })

            return
        }

        if(!req.body.name && !req.body.email && !req.body.nickname){
            res.status(400).send({
                message: "At least one field must to be filled"
            })

            return
        }

        
        await updateUser( 
            req.params.id,           
            req.body.name,
            req.body.nickname,
            req.body.email
        )
        
        res.status(200).send({
            message: "User updated successfully"
        })

    } catch (err: any){
        res.status(400).send({
            message: err.message || err.sqlMessage
        })
    }
}