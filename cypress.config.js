const { defineConfig } = require("cypress");
const moment = require('moment');


module.exports = defineConfig({

reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
    timestamp: "mmddyyyy_HHMMss"
  },
  
  env: {
    baseUrl :'https://opensource-demo.orangehrmlive.com/web/index.php/',
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config
    },

    defaultCommandTimeout: 10000, // 10 seconds   
    specPattern: "cypress/integration/testcases/*.js"
  },
});


