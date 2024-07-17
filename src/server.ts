import fastify, { FastifyInstance } from 'fastify';
import { userRoutes } from './routes/user.route';
import { contactRoutes } from './routes/contact.route';

const app: FastifyInstance = fastify();

// User routes
app.register(userRoutes, {
  prefix: '/users',
});

app.register(contactRoutes, {
  prefix: '/contacts',
});

app.listen({ port: 3000 }, () => {
  const port = 3000 ?? process.env.PORT;
  console.log(`Server listening at http://localhost:${port}`);
});
