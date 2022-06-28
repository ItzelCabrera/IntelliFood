const express = require('express');
const path = require('path');//encarga de unir directorios
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//importing routes
const webRoutes = require('./routes/index');

//settings
app.set('port',process.env.PORT || 3000); //ocupa el pto que el SO le indique o si no usa el 3000
app.set('view engine','ejs'); //configura el motor de plantillas
app.set('views',path.join(__dirname,'views'));

//middlewares: funciones que se ejecutan antes de las peticiones del usuario
app.use(morgan('dev'));//registran las peticiones antes de procesarlas
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password : '2020640576',
    port: 3306,
    database: 'INTELIFOOD'
},'single'));
app.use(express.urlencoded({extended:false}));//para entender los datos que vienen del formulario


//routes; todas las URL que van a pedir nuestros usaurios al servidor
app.use('/',webRoutes);

//static files
app.use(express.static(path.join(__dirname,'public')));

//starting the server
app.listen(app.get('port'),()=>{
    console.log('Server running');
});