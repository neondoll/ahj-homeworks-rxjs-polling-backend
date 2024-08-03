const cors = require('cors');
const express = require('express');
const http = require('http');
const { faker } = require('@faker-js/faker');

const createMessage = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    from: `${firstName.toLowerCase()}@${lastName.toLowerCase()}`,
    subject: Math.random() > 0.5
      ? `Hello from ${firstName} ${lastName}!`
      : `Hello from ${firstName}`,
    body: faker.lorem.lines(),
    received: Date.now(),
  };
};
const generateMessages = () => {
  return faker.helpers.multiple(createMessage, { count: Math.floor(Math.random() * 5) });
};

const app = express();

app.use(cors());

app.get('/messages/unread', (request, response) => {
  const result = { status: 'ok', timestamp: Date.now(), messages: generateMessages() };

  response.send(JSON.stringify(result));
});
app.get('/ping', (request, response) => {
  const result = {
    status: 'ok',
    now: (new Date()).toLocaleString(undefined, {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'long',
      second: 'numeric',
      weekday: 'long',
      year: 'numeric',
    }),
  };

  response.send(JSON.stringify(result));
});

const server = http.createServer(app);

const port = process.env.PORT || 3000;

const startServer = () => {
  try {
    server.listen(port, () => {
      console.log(`Server has been started on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
