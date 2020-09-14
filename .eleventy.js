const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const eleventySchemaPlugin = require("@quasibit/eleventy-plugin-schema");
const eleventySitemapPlugin = require("@quasibit/eleventy-plugin-sitemap");

module.exports = config => {
  // Set directories to pass through to the dist folder
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/fonts/');
  config.addPassthroughCopy('./src/service-worker.js');
  config.addPassthroughCopy('./src/manifest.json');

  // Add nunjuck filters
  config.addNunjucksFilter("colophon", (value) => { const now = new Date(); return `${now.getFullYear() > value ? `${value} - ${now.getFullYear()}` : value }`; } );
  config.addNunjucksFilter("aspectRatio", value => {
    const arr = value.split(':')
    const width = arr[1]
    const height = arr[0]
    return `${((height / width) * 100).toFixed(2)}%`;
  })
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

  config.addShortcode("bio", function(user) {
    const { bio, image, name, twitter } = user;
    const avatar = [];
    const markup = [];
    if (image) {
      avatar.push(`<img style="margin-right: auto; margin-left: auto; width: 5rem; height: 5rem; border-radius:50%;" src="${image}" alt="" role="presentation" />`)
    }
    if (name) {
      markup.push(`<p class="ft-fc-accent ft-sz-doublepica">${name}</p>`)
    }
    if (twitter) {
      markup.push(`<p><a class="ft-sz-minion" style="color: var(--color-brand-secondary); font-weight: var(--font_weight-stone);" href="https://twitter.com/${twitter}" target="_blank" rel="nofollow noopener noreferrer">@${twitter}</a></p>`)
    }
    if (bio) {
      markup.push(`<p class="user_bio">${bio}</p>`)
    }

    return `
      <div class="bio spacing" data-colorscheme="brand-primary" style="background-color: var(--color-background); color: var(--color-foreground);">
        <div class="flex layout-twenty-eighty centered-vt centered-hz">
          <div style="min-width: 5rem;">
            ${avatar.join('')}
          </div>
          <div>
            ${markup.join('')}
          </div>
        </div>
      </div>
    `;
  });

  config.addShortcode("medicalApproval", function(value) {
    const { approvalCode, dateOfExpiry, dateOfPrep } = value;
    const markup = []
    if (approvalCode) {
      markup.push(`<p><strong>Document Number:</strong> ${approvalCode}</p>`)
    }
    if (dateOfPrep) {
      markup.push(`<p><strong>Date of Prep:</strong> ${dateOfPrep}</p>`)
    }
    if (dateOfExpiry) {
      markup.push(`<p><strong>Date of Expiry:</strong> ${dateOfExpiry}</p>`)
    }
    return markup.join('')
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