const mqtt = require('mqtt')
const axios = require('axios')
require('dotenv').config()
// eslint-disable no-undef
const host = process.env.HOST
const username = process.env.USERNAME
const password = process.env.PASSWORD
const port = process.env.PORT

const client = mqtt.connect(host, {
  port: port,
  clientId: 'validation_sub',
  username,
  password
})


client.on('connect', () => {
  console.log('Conectado al servidor MQTT')
  client.subscribe('flights/validation', (err) => {
    if (!err) {
      console.log('Suscrito al tópico "flights/validation"')
    } else {
      console.error('Error al suscribirse:', err)
    }
  })
})

client.on('error', (error) => {
  console.error('Error de conexión:', error)
})
client.on('message', (topic, message) => {
  console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`);
  const data = JSON.parse(message.toString());
  console.log(data);
  if (data.group_id === 3) {
    try {
      const response = axios.post('http://controller:' + process.env.SECURITYPORT + '/validation_data', { data: data });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error making POST request:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  }
});

client.on('close', () => {
  console.log('Cliente MQTT desconectado')
})

client.on('error', (error) => {
  console.error('Error en el cliente MQTT:', error)
})

client.on('reconnect', () => {
  console.log('Intentando reconexión MQTT...')
})

// eslint-enable no-undef