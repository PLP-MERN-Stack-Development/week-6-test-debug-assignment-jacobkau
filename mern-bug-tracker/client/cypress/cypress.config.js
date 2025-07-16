/* eslint-disable no-unused-vars */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
  env: {
    apiUrl: 'http://localhost:5000/api'
  }
});