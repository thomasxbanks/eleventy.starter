const manifest = require('../manifest.json');

const urls = {
  local: 'http://localhost:8080',
  dev: 'http://localhost:8080',
  uat: 'http://localhost:8080',
  prod: 'http://localhost:8080',
};

const context = {
  company: {
    name: 'Big Pharma Ltd',
  },
  site: {
    canonicalUrl: urls[process.env.ENV],
    name: manifest.name,
    description: 'This is the description for the whole site. It will be used as a fallback if a page doesn\'t have a dscription of its own.',
  },
  hero: {
    image: {
      src: 'https://placedog.net/1200/630',
    },
  },
  colophon: {
    copy: 'This website is a Global website owned & operated by Big Pharma Ltd, Swizerland.',
    name: null,
    startDate: 2020,
  },
  medicalApproval: {
    approvalCode: 'QWERTYUIOP',
    dateOfPrep: 'Aug 2020',
    dateOfExpiry: 'Jul 2021',
  },
  language: 'en-GB',
  language_alternative: 'en-US',
  theme: manifest.theme_color,
  twitter: {
    site: null,
    creator: null,
  },
};

context.colophon.name = context.company.name;
context.twitter.site = manifest.name;
context.twitter.creator = context.company.name;

module.exports = context;
