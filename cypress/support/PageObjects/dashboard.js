import recruitment from "./recruitment"

class dashboard {

    clickRecruitment() {
        cy.contains('span', 'Recruitment').click()
        cy.url().should('include', '/recruitment/viewCandidates')
        return new recruitment()
    }

    clickProfile() {
        cy.get(".oxd-userdropdown-name").click()
    }

    clickLogout() {
        cy.contains('a', 'Logout').click()
        cy.url().should('include', '/auth/login')
        cy.wait(3000)
    }

    sendMockCandidatesAndVerify() {
        cy.fixture('candidateslist').then((mockData) => {
            cy.intercept({ method: 'GET', url: Cypress.env('baseUrl') + "api/v2/recruitment/candidates?*" },
                { statusCode: 200, body: mockData }).as('mockdata');

            cy.gotoOrangeHRM("recruitment/viewCandidates")

            cy.wait('@mockdata').then(({ response }) => {
                cy.get(".oxd-table-body .oxd-table-card").should('have.length', response.body.data.length)
                cy.get('.oxd-table-body').screenshot('mocked-candidates-list')
            });
        });

    }

    mockFailedCandidatesRequest() {
        cy.intercept(
            { method: 'GET', url: Cypress.env('baseUrl') + "api/v2/recruitment/candidates?*" },
            {
                statusCode: 404,
                body: { message: 'Not Found' },
            }
        ).as('getCandidates');

        cy.gotoOrangeHRM("recruitment/viewCandidates")

        cy.wait('@getCandidates').then(() => {
            cy.contains('No Records Found').should('be.visible');
            cy.get(".oxd-table-body").should('not.be.visible');
        });

    }


}

export default dashboard