const express= require("express")
const { connection } = require("./Config/db")
const {userRouter}= require("./Routes/user.routes")
const {notesRouter}= require("./Routes/notes.routes")
const { authenticate } = require("./Middlewares/authenticate.middleware")
const app=express()
require("dotenv").config();
const cors= require("cors")
app.use(cors({
    origin:"*"
}))
app.use(express.json())

//! if we hit at "users" endpoint then redirect to userRouter
app.use("/users",userRouter)

app.use(authenticate)
//! if we hit at "notes" endpoint then redirect to notesRouter
app.use("/notes",notesRouter)

//! listening to the server
app.listen(process.env.PORT,async()=>{
    try{
await connection
console.log("connected to db")
    }
    catch{
console.log("can not connect to db")
    }
    console.log(`server is running at ${process.env.PORT}`)
})
