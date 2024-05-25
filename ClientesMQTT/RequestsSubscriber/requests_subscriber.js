const mqtt = require('mqtt')
require('dotenv').config()
// eslint-disable no-undef
const client = mqtt.connect(process.env.MQTT_HOST, {
  port: process.env.MQTT_PORT,
  clientId: 'validation',
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD
})

client.on('connect', () => {
  console.log('Conectado al servidor MQTT')
  client.subscribe('flights/requests', (err) => {
    if (!err) {
      console.log('Suscrito al tópico "flights/requests"')
    } else {
      console.error('Error al suscribirse:', err)
    }
  })
})

client.on('error', (error) => {
  console.error('Error de conexión:', error)
})


client.on('message', (topic, message) => {
  if (topic === 'flights/requests') {
    console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`);
  }
});

client.on('close', () => {
  console.log('Cliente MQTT desconectado')
})

client.on('error', (error) => {
  console.error('Error en el cliente MQTT:', error)
})




client.on('error', function (error){
    console.error('Error en la conexion MQTT', error);
});

// eslint-enable no-undef