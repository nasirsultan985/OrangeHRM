/// <reference types="cypress" />

import dashboard from "../../support/PageObjects/dashboard"

describe('Validate Pagination', function () {
    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })

    const dashboardPage = new dashboard()

    it('Validate the pagination of view candidates table', function () {
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        const recruitmentPage = dashboardPage.clickRecruitment()
        recruitmentPage.clickandVerifyPagination()
        cy.screenshot('validate-pagination')

    })
})