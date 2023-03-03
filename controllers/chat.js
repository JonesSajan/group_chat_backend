const Chat = require('../models/chat')

exports.sendChat = async (req,res,next)=>{
    try{
    const message = req.body.message
    const result = await req.user.createChat({message:message,name:req.user.name})
    res.status(200).json(result)
}catch(err){
    console.log(err)
}
}

exports.getChat = async (req,res,next)=>{
    try{
    const result = await Chat.findAll()
    res.status(200).json(result)
}catch(err){
    console.log(err)
}
}