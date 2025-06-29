import recruitment from "../../support/PageObjects/recruitment"
import dashboard from "../../support/PageObjects/dashboard"

describe('Create Candidate', function () {

    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })

    const dashboardPage = new dashboard()

    it('Create Candidate with Resume Upload', function () {

        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        const recruitmentPage = dashboardPage.clickRecruitment()
        recruitmentPage.clickAddCandidate()
        recruitmentPage.enterFullName(this.data.employeinfo.firstname, this.data.employeinfo.lastname)
        recruitmentPage.enterEmail(this.data.employeinfo.email)
        recruitmentPage.uploadResume("cypress/fixtures/dummyresume.pdf")
        recruitmentPage.clickCheckbox()
        recruitmentPage.clickSave()
        recruitmentPage.assertSuccessMessage()
        dashboardPage.clickRecruitment()
        recruitmentPage.searchCandidatenName(this.data.employeinfo.firstname)
        recruitmentPage.clickSearch()
        recruitmentPage.assertCandidateAdded(this.data.employeinfo.firstname)
        cy.screenshot('create-candidate')
    })

    it('Mock Candidates List', function(){
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        dashboardPage.clickRecruitment()
        dashboardPage.sendMockCandidatesAndVerify()

    })
})