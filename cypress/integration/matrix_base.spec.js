/// <reference types="cypress" />
import { testData } from '../../src/lib/scripts/testFormatNumber.cjs';

describe('Matrix base', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('can render matrix', () => {
		cy.get('[data-test-id="reactive"]').within(() => {
			cy.get('input').as('inputs');

			cy.get('@inputs').should('have.length', 4);
			cy.get('@inputs').first().as('input');

			cy.get('@input').clear().should('have.value', '');
			for (let testFormat of testData['formatString']) {
				cy.get('@input')
					.type(testFormat['input'])
					.blur()
					.should('have.value', testFormat['output'])
					.clear();
			}
		});
	});
});
