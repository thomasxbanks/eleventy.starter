module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addNunjucksFilter("colophon", (value) => { const now = new Date(); return `${now.getFullYear() > value ? `${value} - ${now.getFullYear()}` : value }`; } );
  config.addNunjucksFilter("makeUppercase", (value) => value.toUpperCase() );
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
