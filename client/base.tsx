import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import type { Context } from './next';
import { PageManager } from './next';
import routes from './routes';

export function createApp(ctx?: Context, url?: string) {
  return (
    <Suspense>
      {import.meta.env.SSR ? (
        <StaticRouter location={url ?? '/'}>
          <PageManager routes={routes} ctx={ctx} />
        </StaticRouter>
      ) : (
        <BrowserRouter>
          <PageManager routes={routes} ctx={ctx} />
        </BrowserRouter>
      )}
    </Suspense>
  );
}
