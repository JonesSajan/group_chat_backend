const Group = require('../models/group')
const User = require('../models/user')

exports.getGroups = async (req,res,next)=>{
    try{
    const result = await req.user.getGroups()
    res.status(200).json(result)
}catch(err){
    console.log(err)
    res.status(500).json("something went wrong")
}
}

exports.createGroup = async (req,res,next)=>{
    try{
    const name = req.body.name
    const users = req.body.users
    const grp = await req.user.createGroup({name:name,admin:req.user.id})
    for( i in users){

        console.log("/////user/////",users[i])

        user=await User.findByPk(users[i])

         result = grp.addUser(user, { through: { selfGranted: false } })
         console.log("????????????????????????????????????????????",result)
    }

    res.status(200).json({group:grp})
}catch(err){
    console.log(err)
    res.status(500).json("something went wrong")

}
}

exports.addUsers = async (req,res,next)=>{
    try{
    const name = req.body.name
    const result = await req.user.createGroup({name:name,admin:req.user.name})
    res.status(200).json(result)
}catch(err){
    console.log(err)
    res.status(500).json("something went wrong")

}
}