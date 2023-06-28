import express from 'express'
import cors from 'cors'
import knex from 'knex'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import createUser from './endpoints/createUser'
import getUserById from './endpoints/getUserById'
import editUser from './endpoints/editUser'
import createTask from './endpoints/createTask'
import getTaskById from './endpoints/getTaskById'

dotenv.config()

export const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 3306
    }       
})

const app = express()
app.use(express.json())
app.use(cors())


app.put("/user", createUser)
app.put("/task", createTask)

app.get("/user/:id", getUserById)
app.get("/task/:id", getTaskById)

app.post("/user/edit/:id", editUser)


const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is listening on http://localhost:${address.port} - By: Th3rgeZin`)
    } else {
        console.error("Failure upon starting server")
    }
})