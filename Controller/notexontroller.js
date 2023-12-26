const notemodel=require("../models/note")

const createNote=async(req,res)=>{
const{title,des}=req.body

const newnote=new notemodel({
    title:title,
    des:des,
    userId:req.userId
})
try {
    await newnote.save()
    res.status(201).json(newnote)
} catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"})
}
}

const updateNote= async(req,res)=>{
const id=req.params.id
const{title,des}=req.body
const newnote={
    title:title,
    des:des,
    userId:req.userId
}
try {
    await notemodel.findByIdAndUpdate(id,newnote,{new:true})
    res.status(200).json(newnote)
} catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong"})
}
}

const deleteNote=async(req,res)=>{
    const id=req.params.id
    try {
        const note = await notemodel.findByIdAndDelete(id)
        res.status(202).json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong"})
    }   

}
const getNote=async(req,res)=>{
try {
    const note=await notemodel.find({userId:req.userId });
    res.status(200).json(note)
} catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong"})
}
}
module.exports={createNote,updateNote,deleteNote,getNote}