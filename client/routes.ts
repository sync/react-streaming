import React from 'react';

export default [
  {
    path: '/',
    component: React.lazy(() => import('./views/index')),
  },
  {
    path: '/other',
    component: React.lazy(() => import('./views/other')),
  },
];
