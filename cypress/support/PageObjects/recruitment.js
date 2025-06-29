class recruitment {

    clickAddCandidate() {
        cy.contains('button', 'Add').click()
        cy.url().should('include', '/recruitment/addCandidate')
    }

    enterFullName(firstName, lastName) {
        cy.get("input[name='firstName']").type(firstName)
        cy.get("input[name='lastName']").type(lastName)
    }

    enterEmail(email) {
        cy.get("input[placeholder='Type here']").eq(0).type(email)
    }

    uploadResume(filePath) {
        cy.get(".oxd-file-input").selectFile(filePath, { force: true });
    }

    clickCheckbox() {
        cy.get(".oxd-checkbox-wrapper input").check({ force: true })
    }

    clickSave() {
        cy.contains('button', 'Save').click()
    }

    assertSuccessMessage() {
        cy.contains('Success').should('be.visible')
    }

    assertCandidateAdded(candidateName) {
        cy.contains(`${candidateName}`).should('be.visible')

    }

    searchCandidatenName(candidateName) {
        cy.get("input[placeholder='Type for hints...']").type(candidateName)
            .type('{downarrow}')
            .type('{enter}')
        cy.wait(2000)
        cy.get("div[role='listbox']").should('be.visible')
        cy.get("input[placeholder='Type for hints...']").type('{downarrow}').type('{enter}')
    }

    clickSearch() {
        cy.contains('button', 'Search').click()
    }

    clickViewCandidate(name) {
        cy.get(".oxd-table-body .oxd-table-row .oxd-table-cell:nth-child(3)").each(($e1, index) => {
            const cellText = $e1.text().trim();

            if (cellText.includes(name)) {
                cy.get(".oxd-table-body .oxd-table-row")
                    .eq(index)
                    .find(".oxd-table-cell:nth-child(7) .oxd-icon-button")
                    .eq(0)
                    .click();
            }
        });
    }

    enableEditCandidate() {
        cy.get(".oxd-switch-wrapper").find("span.oxd-switch-input").click()
    }

    enterNotes(notes) {
        cy.get("textarea[placeholder='Type here']").clear().type(notes)
    }

    assertRequiredFieldValidations() {
        cy.get('.oxd-input-field-error-message')
            .should('have.length', 3)
            .each(($el) => {
                cy.wrap($el).should('have.text', 'Required');
            })
    }

    clickandVerifyPagination() {
        cy.get('body').then(($body) => {
            if ($body.find('.oxd-pagination__ul button.oxd-pagination-page-item--page').length >= 1) {
                cy.get('.oxd-pagination__ul button.oxd-pagination-page-item--page').then(($buttons) => {
                    const totalButton = $buttons.length;
                    for (let i = 1; i < totalButton; i++) {
                        cy.get('.oxd-pagination__ul button')
                            .eq(i)
                            .click();
                        cy.wait(500);
                        cy.get(".oxd-table-body").should('be.visible')
                    }
                })
            }
            else {
                cy.log("There is only 1 Page")
            }
        })

    }
}

export default recruitment