// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

jest.setTimeout(10000);

describe('instruments:', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'привет')).toThrow();
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('привет', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay(5000)).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as argument', () => {
        expect(() => getUniqueID('привет')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getFullApiUrl function should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type as first argument', () => {
        expect(() => getFullApiUrl(2, 'HBFUWEF&')).toThrow();
    });

    test('getFullApiUrl function should throw, when called with non-string type as second argument', () => {
        expect(() => getFullApiUrl('HBFUWEF&', 10)).toThrow();
    });

    test('getFullApiUrl function should produce a string of a desired given', () => {
        expect(typeof getFullApiUrl('arg1', 'arg2')).toBe('string');
    });

    test('getFullApiUrl function should to match a string of a desired given', () => {
        expect(getFullApiUrl('arg1', 'arg2')).toMatch(/arg1\/arg2/);
    });
});

