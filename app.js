const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user')
const Chat = require('./models/chat')
const Group = require('./models/group')
const io = require('socket.io')(3001,{cors:{
  origin: ['http://127.0.0.1:5500'], 
}})
const chatController = require("./controllers/chat")

const app = express();

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat')
const groupRoutes = require('./routes/group')



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: 'http://127.0.0.1:5500' 
}));

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/group', groupRoutes);

User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)


User.belongsToMany(Group, { through: 'user_group' });
Group.belongsToMany(User, { through: 'user_group' });


io.on('connection', socket => {
  var room;
  console.log("????????????????????????????????????",socket.id)
  socket.on("create-room",(id)=>{
    console.log(id)
    socket.join(id)
    room=id;
  })
  socket.on("send-message",(message,token)=>{
    chatController.sendChat(message,room,token)
    socket.broadcast.emit("receive-message",message,token)
  })
  })




sequelize
  .sync()
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

