const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
const PORT =  5000;

//connect to DataBase
connectDB();

//middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/' , (req,res) => {
  res.send('its running');
})


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
