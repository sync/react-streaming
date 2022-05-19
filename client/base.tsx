import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Provider as StateProvider } from 'jotai';

import routes from './routes';
import { todoList } from './state';

type Data = {
  todoList: Array<string>;
};

type Context<D = any> = {
  data: D;
};

export function createApp(ctx: Context<Data>, url?: string) {
  return (
    <React.StrictMode>
      <StateProvider initialValues={[[todoList, ctx.data.todoList]]}>
        <Suspense>
          {import.meta.env.SSR ? (
            <StaticRouter location={url ?? '/'}>
              <Routes>
                {routes.map(({ path, component: Component }) => {
                  return (
                    <Route key={path} path={path} element={<Component />} />
                  );
                })}
              </Routes>
            </StaticRouter>
          ) : (
            <BrowserRouter>
              <Routes>
                {routes.map(({ path, component: Component }) => {
                  return (
                    <Route key={path} path={path} element={<Component />} />
                  );
                })}
              </Routes>
            </BrowserRouter>
          )}
        </Suspense>
      </StateProvider>
    </React.StrictMode>
  );
}
