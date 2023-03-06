const Chat = require('../models/chat')
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");




  

exports.sendChat = async (message,groupid,token)=>{
    try{
    console.log("//////////////////sendChat/////////////////////////")

    user = jwt.verify(token, '8770903047');
    console.log(user,user.id)

    const result = await Chat.create({message:message,name:user.name,groupId:groupid,userId:user.id})
    console.log(result)
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