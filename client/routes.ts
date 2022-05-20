import { getPageRoutes } from './next';

export default getPageRoutes(import.meta.globEager('/pages/**/*.{jsx,tsx}'));
