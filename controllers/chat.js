
exports.sendChat = async (req,res,next)=>{
    const message = req.body.message
    const result = await req.user.createChat({message:message})
    res.status(200).json(result)
}