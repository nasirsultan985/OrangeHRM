// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//const cypress = require("cypress");
import 'cypress-mochawesome-reporter/register';
import 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.url().should('include', '/dashboard');
});


Cypress.Commands.add('gotoOrangeHRM', (path) => {
  cy.visit(Cypress.env('baseUrl') + `${path}`);
});


Cypress.Commands.add('singleSignOn', () => {
  cy.fixture('credentials').then((data) => {
    cy.request('POST', Cypress.env('baseUrl') + 'auth/login', {
      username: data.login.username,
      password: data.login.password
    }).then((response) => {
      expect(response.status).to.eq(200);
      const token = response.body.token;
      cy.log(token)

      cy.visit(Cypress.env('baseUrl') + 'auth/login', {
        onBeforeLoad: (window) => {
          window.localStorage.setItem('token', token);
        }
      });
    });
  });
});


