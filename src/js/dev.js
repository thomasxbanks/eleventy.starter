const dev = () => {
  const url = window.location.href;
  if (url.indexOf('localhost') === -1) return;
  console.log('>>>>>>', 'Local development!');
  [...document.querySelectorAll('*')].forEach((el) => el.style.outline = '1px dashed hotpink');
};

export default dev;
