/// <reference types="cypress" />

import dashboard from "../../support/PageObjects/dashboard"

describe('Error Messages Validation', function () {
    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })
    const dashboardpage = new dashboard()

    it('Validate Error Messages for Add Candidate form', function () {
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        const recruitmentPage = dashboardpage.clickRecruitment()
        recruitmentPage.clickAddCandidate()
        recruitmentPage.clickSave()
        recruitmentPage.assertRequiredFieldValidations()
        cy.screenshot('validate-errormessages')

    })
})