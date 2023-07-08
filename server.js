require ('dotenv').config();
const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3500;
const mongoose = require ('mongoose');
const connectDB = require ('./config/dbConn');
const cookieParser = require ('cookie-parser');
const verifyJWT = require ('./middleware/verifyJWT');

//connect to db
connectDB();

app.use (express.json());
app.use (express.urlencoded ({ extended : false }));
app.use (cookieParser());

app.use ('/', require ('./routes/root'));
app.use ('/auth', require ('./routes/auth'));
app.use ('/register', require ('./routes/register'));
app.use ('/refresh', require ('./routes/refresh'));
app.use ('/logout', require ('./routes/logout'));

app.use (verifyJWT);
app.use ('/user', require ('./routes/user'));

mongoose.connection.once ('open', () => {
    console.log ('Connected to MongoDB');
    app.listen (PORT, () => console.log (`Server is listening on the port ${PORT}`));
});