const count = 900;
const calculateTransitionDelay = (index = 0, max = 1, len = 1000) => ((index < max) ? (index + 1) * Math.floor((len / max)) : len);

const createImage = (thumb, index) => {
  // Make the real image
  const image = document.createElement('img');
  // Add all of the classes
  [...thumb.classList].forEach((className) => image.classList.add(className));
  // Add the dimension properties
  image.width = thumb.width;
  image.height = thumb.height;
  // Hide the real image until it has loaded
  image.style.position = 'absolute';
  image.style.opacity = 0;
  image.style.transition = `opacity ease ${count}ms`;
  thumb.style.transition = `opacity ease ${count}ms`;

  const transitionDelay = calculateTransitionDelay(index, 12, 1000);
  image.style.transitionDelay = `${transitionDelay}ms`;
  thumb.style.transitionDelay = `${transitionDelay}ms`;

  // Set the src attribute to the desired one
  image.src = thumb.dataset.src;
  image.alt = thumb.alt;
  return image;
};

const showImage = (image, thumb) => {
  // unhide the real thumb
  console.log('--- showImage.load');
  setTimeout(() => {
    image.style.opacity = 1;
    thumb.style.opacity = 0;
  }, count / 2);
  console.log('--- showImage.opacity');
  setTimeout(() => {
    console.log('--- showImage.remove()');
    // destroy the dummythumb
    thumb.remove();
    image.removeAttribute('width');
    image.removeAttribute('height');
    image.style.position = '';
  }, count);
};

export const progressiveImage = (thumb, index) => {
  const { src } = thumb.dataset;
  if (!src) return false;
  if (!src.startsWith('http')) return false;
  const image = createImage(thumb, index);
  // Add the real image before the dummy thumb
  thumb.insertAdjacentElement('afterend', image);
  if (image.complete) {
    showImage(image, thumb);
  } else {
    image.addEventListener('load', () => showImage(image, thumb));
  }
};

export const progressiveImages = (thumbs) => {
  // Progressively load images
  if (!thumbs || thumbs.length <= 0) return;

  const config = {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(((entries, self) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stop watching and load the image
        console.log(`>>> ${entry.target.dataset.src} is in the viewport!`);
        progressiveImage(entry.target, index);
        self.unobserve(entry.target);
      }
    });
  }), config);

  thumbs.forEach((thumb) => {
    observer.observe(thumb);
  });
};
