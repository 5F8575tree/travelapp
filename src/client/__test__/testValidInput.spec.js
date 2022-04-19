/**
 * @jest-environment jsdom
 */

import { validInput } from '../js/formatDates';

//we need to test if a string is valid
test('blank string is invalid', () => {
    expect(validInput("tokyo")).toBe(true);
});