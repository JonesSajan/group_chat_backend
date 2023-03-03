const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const User = require('./models/user')
const Chat = require('./models/chat')

const app = express();

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat')



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: 'http://127.0.0.1:5500' 
}));

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

User.hasMany(Chat)
Chat.belongsTo(User)




sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

