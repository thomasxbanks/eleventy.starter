import dev from './dev';
import { progressiveImages } from './progressive-images';

const init = async () => {
  dev();
  if ('serviceWorker' in navigator) {
    console.log('>>> serviceWorker in navigator');
    navigator.serviceWorker.register('../service-worker.js').then(() => {
      console.log('Service Worker Registered');
    });
  progressiveImages([...document.querySelectorAll('[data-progressive]')]);
};

window.onload = init;
