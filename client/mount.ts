import './base.css';
import { hydrateRoot } from 'react-dom/client';
import { createApp } from './base';

const main = document.querySelector('main');
if (main) {
  hydrateRoot(
    main,
    // No need to pass url as second parameter
    // here since BrowserRouter is used on the client
    createApp(),
  );
}
