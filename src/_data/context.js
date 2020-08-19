const manifest = require('../manifest.json');

module.exports = {
  site: {
    name: manifest.name,
    description: 'This is the description for the whole site. It will be used as a fallback if a page doesn\'t have a dscription of its own.',
  },
  colophon: {
    name: 'thomasxbanks',
    startDate: 2014,
  },
  language: 'en-GB',
  theme: '#daa520',
};
