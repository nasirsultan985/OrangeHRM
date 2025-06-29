import dashboard from "../../support/PageObjects/dashboard"

describe('Edit Candidates', function(){

    this.beforeEach(function () {
        cy.fixture('credentials').then(function (data) {
            this.data = data
        })
    })
    
    const dashboardPage = new dashboard()

    it('Edit Existing Candidate', function(){
                
        cy.gotoOrangeHRM("auth/login")
        cy.login(this.data.login.username, this.data.login.password)
        const recruitmentPage = dashboardPage.clickRecruitment()
        recruitmentPage.searchCandidatenName(this.data.employeinfo.firstname)
        recruitmentPage.clickSearch()
        recruitmentPage.clickViewCandidate(this.data.employeinfo.firstname)
        recruitmentPage.enableEditCandidate()
        recruitmentPage.enterNotes("These are test notes to check editing")
        recruitmentPage.clickSave()
        recruitmentPage.assertSuccessMessage()
        cy.screenshot('edit-candidate')


    })
})