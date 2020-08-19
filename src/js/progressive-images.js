const count = 900;
const calculateTransitionDelay = (index = 0, max = 1, len = 1000) => ((index < max) ? (index + 1) * Math.floor((len / max)) : len);

const createImage = (image, index) => {
  // Make the real image
  const img = document.createElement('IMG');
  // Add all of the classes
  [...image.classList].forEach((className) => img.classList.add(className));
  // Add the dimension properties
  img.width = image.width;
  img.height = image.height;
  // Hide the real image until it has loaded
  img.style.position = 'absolute';
  img.style.opacity = 0;
  img.style.transition = `opacity ease ${count}ms`;
  image.style.transition = `opacity ease ${count}ms`;

  const delay = calculateTransitionDelay(index, 12, 1000);
  img.style.transitionDelay = `${delay}ms`;
  image.style.transitionDelay = `${delay}ms`;

  // Set the src attribute to the desired one
  img.src = image.dataset.src;
  img.alt = image.alt;
  return img;
};

const showImage = (img, image) => {
  // unhide the real image
  setTimeout(() => {
    img.style.opacity = 1;
    image.style.opacity = 0;
  }, count / 2);
  setTimeout(() => {
    // destroy the dummyImage
    image.remove();
    img.removeAttribute('width');
    img.removeAttribute('height');
    img.style.position = '';
  }, count);
};

export const progressiveImage = (image, index) => {
  const { src } = image.dataset;
  if (!src) return false;
  if (!src.startsWith('http')) return false;
  const img = createImage(image, index);
  // Add the real image after the dummy image
  image.insertAdjacentElement('beforebegin', img);
  if (img.complete) {
    showImage(img, image);
  } else {
    img.addEventListener('load', () => showImage(img, image));
  }
};


export const progressiveImages = (images) => {
  // Progressively load images
  if (!images || images.length <= 0) return;

  const config = {
    rootMargin: '0px 0px 100px 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(((entries, self) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        console.log(`Image ${entry.target.dataset.src} is in the viewport!`);
        progressiveImage(entry.target, index);
        // Stop watching and load the image
        self.unobserve(entry.target);
      }
    });
  }), config);

  images.forEach((image) => {
    observer.observe(image);
  });
};
