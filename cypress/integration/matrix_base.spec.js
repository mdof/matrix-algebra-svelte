/// <reference types="cypress" />
import { testData } from '../../src/lib/scripts/testFormatNumber.cjs';

describe('Input number', () => {
	it('format on leave', () => {
		cy.visit('/');
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
				//Negative value
				cy.get('@input')
					.type('-' + testFormat['input'])
					.blur()
					.should('have.value', '-' + testFormat['output'])
					.clear();
			}
		});
	});
	it('format on leave - zero', () => {
		cy.visit('/');
		cy.get('[data-test-id="reactive"]').within(() => {
			cy.get('input').as('inputs');

			cy.get('@inputs').should('have.length', 4);
			cy.get('@inputs').first().as('input');

			cy.get('@input').clear().should('have.value', '');
			for (let testFormat of testData['formatStringZero']) {
				cy.get('@input')
					.type(testFormat['input'])
					.blur()
					.should('have.value', testFormat['output'])
					.clear();
			}
		});
	});
});
