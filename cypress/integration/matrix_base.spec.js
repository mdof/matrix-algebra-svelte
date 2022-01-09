/// <reference types="cypress" />
import { testData } from '../../src/lib/scripts/testFormatNumber.cjs';

// multiple tests to avoid flake tests
// https://glebbahmutov.com/blog/repeat-to-fight-flake/
const numTests = 4;
describe('Input number', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('[data-test-id="reactive"]').as('matrix');
	});

	Cypress._.times(numTests, (k) => {
		it(`test ${k} of ${numTests} : format on leave`, () => {
			cy.get('@matrix').within(() => {
				// cy.wait(2000);
				cy.get('input').should('have.length', 4).first().as('input');

				cy.get('@input').clear().should('have.value', '');

				for (let testFormat of testData['formatString']) {
					cy.get('@input')
						.focus()
						.type(testFormat['input'])
						.blur()
						.should('have.value', testFormat['output'])
						.clear();
					//Negative value
					cy.get('@input')
						.focus()
						.type('-' + testFormat['input'])
						.blur()
						.should('have.value', '-' + testFormat['output'])
						.clear();
				}
				//Test zeros
				for (let testFormat of testData['formatStringZero']) {
					cy.get('@input')
						.focus()
						.type(testFormat['input'])
						.blur()
						.should('have.value', testFormat['output'])
						.clear();
				}
			});
		});
	});
});
