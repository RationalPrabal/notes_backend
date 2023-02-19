const express= require("express")
const { noteModel } = require("../Models/notes.model")

const notesRouter= express.Router()


//! create the notes
notesRouter.post("/create",async (req,res)=>{
try{
    console.log(req.body)
const newNote= new noteModel(req.body)
await newNote.save()
res.send("note has been added")
}
catch{
res.send("can not add the note")
}
})

//! get the notes
notesRouter.get("/",async(req,res)=>{

 try{
     let notes= await noteModel.find({user:req.body.user})
     res.send(notes)
 }
 catch{
res.send("can not get the notes")
 }
})

//! delete the notes

notesRouter.delete("/delete/:id",async(req,res)=>{
    const id= req.params.id
   
try{
await noteModel.findByIdAndDelete({_id:id})
res.send("note has been deleted")
console.log("note has been deleted")
}
catch{
res.send("can not delete the note")
console.log("can not delete the note")
}
    
})

//! update the notes

notesRouter.patch("/update/:id",async(req,res)=>{
    const id= req.params.id
   console.log(req.body)
try{
await noteModel.findByIdAndUpdate(id,req.body)
res.send("note has been deleted")
console.log("note has been deleted")
}
catch{
res.send("can not delete the note")
console.log("can not delete the note")
}
    
})

module.exports={
    notesRouter
}