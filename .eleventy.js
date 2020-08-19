const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const eleventySchemaPlugin = require("@quasibit/eleventy-plugin-schema");
const eleventySitemapPlugin = require("@quasibit/eleventy-plugin-sitemap");

module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/service-worker.js');
  config.addPassthroughCopy('./src/manifest.json');

  // Add nunjuck filters
  config.addNunjucksFilter("colophon", (value) => { const now = new Date(); return `${now.getFullYear() > value ? `${value} - ${now.getFullYear()}` : value }`; } );
  config.addNunjucksFilter('relPath', value => value.replace(/^.*\/\/[^\/]+/, ''));
  config.addNunjucksFilter('path', (relUrl) => {
    if (!relUrl) return
    const arr = Array.from(relUrl.replace(/\/\s*$/,'').split('/'));
    let str = '';
    for (let i = 0; i < arr.length; i += 1) {
      let prefix = (i === 0) ? '' : '../';
      str += prefix;
    }
    return str;
  });

  // Register plugins
  config.addPlugin(eleventyHelmetPlugin);
  config.addPlugin(eleventySchemaPlugin);
  config.addPlugin(eleventySitemapPlugin, {
    sitemap: {
      hostname: "http://localhost:8081",
    },
  });

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