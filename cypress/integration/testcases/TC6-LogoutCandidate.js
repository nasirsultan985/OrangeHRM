/// <reference types="cypress" />

import dashboard from "../../support/PageObjects/dashboard"

describe('Logout User', function(){
    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })
    const dashboardpage = new dashboard()

    it('Logout and Verify the User', function(){
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        dashboardpage.clickRecruitment()
        dashboardpage.clickProfile()
        dashboardpage.clickLogout()
        cy.screenshot('user-loggedout')

    })
})