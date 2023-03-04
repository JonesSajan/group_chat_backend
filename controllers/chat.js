const Chat = require('../models/chat')
const { Op } = require("sequelize");

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
    console.log("///////////////////////////////////////////////",req.query,req.params)
    id = req.params.id
    const result = await Chat.findAll({where: {id: {[Op.gt]: id}}})
    res.status(200).json(result)
}catch(err){
    console.log(err)
}
}