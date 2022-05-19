export {};

declare global {
  interface Window {
    hydration: { data: any };
  }
}
