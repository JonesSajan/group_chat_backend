const path = require('path');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

const app = express();

const userRoutes = require('./routes/user');



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors( {
  origin: '*' 
}));

app.use('/user', userRoutes);




sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

