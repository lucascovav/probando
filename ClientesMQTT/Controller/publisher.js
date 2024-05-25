const Koa = require('koa')
const mqtt = require('mqtt')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');
require('dotenv').config()

// eslint-disable no-undef
const app = new Koa()
const port = process.env.SECURITYPORT
const router = new Router()
const axios = require('axios')

app.use(bodyParser());
app.use(router.routes())
app.use(router.allowedMethods())

const host = process.env.HOST
const username = process.env.USERNAME
const password = process.env.PASSWORD

const client = mqtt.connect(host, {
  port: 9000,
  clientId: 'Publisher_request',
  username,
  password
})


app.listen(port, () => {
  console.log('Server is running')
})

router.post('/info_data', async (ctx) => {
  const jsonData = ctx.request.body
  console.log("Info data")
  console.log(jsonData)
  try {
    axios.post('http://api_cont:' + 3000 + '/data', jsonData)
    ctx.status = 200;
    ctx.body = { message: 'Datos recibidos correctamente' };
  } catch (error) {
    console.error('Error al procesar los datos:', error);
    ctx.status = 400;
    ctx.body = { error: 'Error al procesar los datos' };
  }
});

router.post('/validation_data', async (ctx) => {
  try {
    const jsonData = ctx.request.body;
    const data = jsonData.data;
    console.log("Reenviar datos de validacion");
    console.log(data);
    const response = await axios.post('http://api_cont:3000/validation_data', jsonData);
    console.log('Respuesta del servidor externo:', response.data);

    ctx.status = 200;
    ctx.body = { message: 'Datos de validación enviados correctamente.' };
  } catch (error) {

    console.error('Error al procesar datos de validación o al enviar la solicitud:', error);
    ctx.status = 500;
    ctx.body = { error: 'Ocurrió un error al procesar los datos de validación.' };
  }
});


router.post('/sell_ticket', async (ctx) => {
  try {
    const jsonData = ctx.request.body;
    const data = jsonData.data;
    console.log("Sell ticket")
    console.log(data);
    if (data) {
      client.publish('flights/requests', data);
      ctx.status = 200;
      ctx.body = { message: 'Solicitud de venta de boleto enviada correctamente.' };
    } else {
      ctx.status = 400;
      ctx.body = { error: 'Datos de solicitud incompletos.' };
    }
  } catch (error) {
    console.error('Error al procesar solicitud de venta de boleto:', error);
    ctx.status = 500;
    ctx.body = { error: 'Error al procesar solicitud de venta de boleto.' };
  }
});
