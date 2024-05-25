const mqtt = require('mqtt');
const axios = require('axios');
require('dotenv').config()
// eslint-disable no-undef
const host = process.env.HOST
const username = process.env.USERNAME
const password = process.env.PASSWORD
const port = process.env.PORT

const client = mqtt.connect(host, {
  port: port,
  clientId: 'info_subscriber',
  username,
  password
})



client.on('connect', function () {
    console.log('Conectado al broker info');
    client.subscribe('flights/info', function (err){
        if (err) {
            console.error("Error al suscribirse al canal:", err)
        }
    }); 
});

client.on('message', function (topic, message){
  console.log(`Mensaje recibido en el tópico ${topic}: ${message.toString()}`)
  axios.post('http://controller:' + 9651 + '/info_data', { data: message.toString() })
    .then(response => {
      console.log('Datos enviados exitosamente a la aplicación.', response)
    })
    .catch(error => {
      console.error('Error al enviar datos a la aplicación:', error)
    })
});

client.on('error', function (error){
    console.error('Error en la conexion MQTT', error);
});
// eslint-enable no-undef