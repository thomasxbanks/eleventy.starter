const manifest = require('../manifest.json');

module.exports = {
  site: {
    name: manifest.name,
    description: 'This is the description for the whole site. It will be used as a fallback if a page doesn\'t have a dscription of its own.',
  },
  colophon: {
    copy: 'This website is a Global website owned & operated by Big Pharma Ltd, Swizerland.',
    name: 'Big Pharma Ltd',
    startDate: 2020,
  },
  medicalApproval: {
    approvalCode: 'QWERTYUIOP',
    dateOfPrep: 'Aug 2020',
    dateOfExpiry: 'Jul 2021',
  },
  language: 'en-GB',
  theme: '#daa520',
};
