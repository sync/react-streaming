import { createApp } from './base';
import routes from './routes';

export default {
  // Provides client-side navigation routes to server
  routes,
  // Provides function needed to perform SSR
  createApp,
};
