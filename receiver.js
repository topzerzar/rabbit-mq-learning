const amqp = require('amqplib/callback_api');

const host = 'rabbitmq:5672'
const credential = 'guest:guest'
const server = `amqp://${credential}@${host}`;

amqp.connect(server, (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = 'hello';

    ch.assertQueue(queue, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    ch.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});