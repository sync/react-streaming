import Fastify from 'fastify';
import FastifyVite from 'fastify-vite';
import renderer from './renderer.js';

const server = Fastify({ ignoreTrailingSlash: true });
const root = import.meta.url;

server.get('/api/todo-list', (_, reply) => {
  reply.send(['Do laundry', 'Respond to emails', 'Write report']);
});

server.setErrorHandler((err, req, reply) => {
  // eslint-disable-next-line no-console
  console.error(err);
  reply.code(500);
  reply.send(err);
});

await server.register(FastifyVite, { root, renderer });

await server.vite.ready();
await server.listen(3000);
