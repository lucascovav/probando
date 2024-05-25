const Koa = require('koa');
const cors = require('koa2-cors');
const routes = require('./router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/api';
const app = new Koa();

app.use(cors({

  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowHeaders: [
    'Access-Control-Allow-Headers',
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Auth'
  ],
  allowMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'DELETE', 'PATCH'],
}));

app.use(bodyParser());

app.use(routes.routes());
app.use(routes.allowedMethods());


const port = 3000;

app.use(async ctx => {
  ctx.body ='Hello, World!!!'
});

app.listen(port, () => {
  console.log(`Servidor Koa escuchando en ${port}`)
});


mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Conectado')
  })
  .catch(error => {
    console.error('Error al conectar MongoDB:', error)
  })
;
module.exports = app;
