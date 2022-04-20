/**
 * @jest-environment jsdom
 */

import validInput from '../js/validInput.js';

test('validInput is defined', () => {
    expect(validInput).toBeDefined();
});