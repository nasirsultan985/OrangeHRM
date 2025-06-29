/// <reference types="cypress" />

import dashboard from "../../support/PageObjects/dashboard";

describe('Candidate API failure handling', function() {
    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })
    const dashboardPage = new dashboard()

    it('should show error message when candidate list fails to load', function() {
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        dashboardPage.clickRecruitment()
        dashboardPage.mockFailedCandidatesRequest()
        cy.screenshot('validate-norecords')

    });
});
