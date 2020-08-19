import dev from './dev';

const init = async () => {
  dev();
  if ('serviceWorker' in navigator) {
    console.log('>>> serviceWorker in navigator');
    navigator.serviceWorker.register('../service-worker.js').then(() => {
      console.log('Service Worker Registered');
    });
};

window.onload = init;
