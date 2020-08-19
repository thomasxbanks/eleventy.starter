import { delay } from 'lxl.utils';
import { progressiveImages } from './progressive-images';

const init = async () => {
  console.log('>>>>>> window.load.init()');
  if ('serviceWorker' in navigator) {
    console.log('>>> serviceWorker in navigator');
    navigator.serviceWorker.register('../service-worker.js').then(() => {
      console.log('Service Worker Registered');
    });
  }
  progressiveImages([...document.querySelectorAll('[data-progressive]')]);
  console.log('--- waiting');
  await delay(5);
  console.log('--- finished waiting');
};

window.onload = init;
