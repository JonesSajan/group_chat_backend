const Chat = require('../models/chat')
const { Op } = require("sequelize");

exports.sendChat = async (req,res,next)=>{
    try{
    console.log("//////////////////sendChat/////////////////////////",req.body)
    const message = req.body.message
    const groupid = req.body.groupid
    const result = await req.user.createChat({message:message,name:req.user.name,groupId:groupid})
    res.status(200).json(result)
}catch(err){
    console.log(err)
}
}

exports.getChat = async (req,res,next)=>{
    try{
    console.log("///////////////////////////////////////////////",req.params.front)
    p=JSON.parse(req.params.front)
    id = p.id
    group = p.groupid
    console.log("///////////////////////////////////////////////",req.params.front,p.id)

    const result = await Chat.findAll({where: {id: {[Op.gt]: id},groupId:group}})
    res.status(200).json(result)
}catch(err){
    console.log(err)
}
}