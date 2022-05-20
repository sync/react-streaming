// Helpers from the Node.js stream library to
// make it easier to work with renderToPipeableStream()
import { Readable, PassThrough } from 'node:stream';

// React 18's preferred server-side rendering function,
// which enables the combination of React.lazy() and Suspense
import { renderToPipeableStream } from 'react-dom/server';

// fastify-vite's minimal HTML templating function,
// which extracts interpolation variables from comments
// and returns a function with the generated code
import { createHtmlTemplateFunction } from 'fastify-vite';

// Used to safely serialize JavaScript into
// <script> tags, preventing a few types of attack
import devalue from 'devalue';

// The fastify-vite renderer overrides
export default {
  createHtmlFunction,
  createRenderFunction,
  createRoute,
};

function createRoute({ handler, errorHandler, route }, scope, _config) {
  if (route.getServerSideProps) {
    // If getServerSideProps is provided, register JSON endpoint for it
    scope.get(`/json${route.path}`, async (req, reply) => {
      reply.send(
        await route.getServerSideProps({
          req,
        }),
      );
    });
  }
  scope.get(route.path, {
    // If getServerSideProps is provided,
    // make sure it runs before the SSR route handler
    ...(route.getServerSideProps && {
      async preHandler(req, _reply) {
        req.serverSideProps = await route.getServerSideProps({
          req,
        });
      },
    }),
    handler,
    errorHandler,
    ...route,
  });
}

// The return value of this function gets registered as reply.html()
function createHtmlFunction(source, _scope, _config) {
  const [headSource, footer] = source.split('<!-- element -->');
  const headTemplate = createHtmlTemplateFunction(headSource);
  return function ({ stream, serverSideProps }) {
    const head = headTemplate({
      hydration: `<script>window.hydration = ${devalue({
        serverSideProps,
      })}</script>`,
    });
    this.type('text/html');
    const readable = Readable.from(streamHtml(head, stream, footer))
      // Errors from React SSR can be captured here
      // eslint-disable-next-line no-console
      .on('error', console.log);
    this.send(readable);
  };
}

function createRenderFunction({ createApp }) {
  // createApp is exported by client/index.js
  return function (server, req, reply) {
    // Server data that we want to be used for SSR
    // and made available on the client for hydration
    const serverSideProps = req.serverSideProps;
    // Creates main React component with all the SSR context it needs
    const app = createApp({ serverSideProps, server, req, reply }, req.url);
    // Perform SSR, i.e., turn app.instance into an HTML fragment
    // The SSR context data is passed along so it can be inlined for hydration
    return { serverSideProps, stream: toReadable(app) };
  };
}

// Helper function to prepend and append chunks the body stream
async function* streamHtml(head, body, footer) {
  yield head;
  // We first await on the stream being ready (onShellReady)
  // And then await on its AsyncIterator
  for await (const chunk of await body) {
    yield chunk;
  }
  yield footer;
}

// Helper function to get an AsyncIterable (via PassThrough)
// from the limited stream returned by renderToPipeableStream()
function toReadable(app) {
  const duplex = new PassThrough();
  return new Promise((resolve, reject) => {
    try {
      const pipeable = renderToPipeableStream(app, {
        onShellReady() {
          resolve(pipeable.pipe(duplex));
        },
        onShellError(error) {
          reject(error);
        },
      });
    } catch (error) {
      resolve(error);
    }
  });
}
