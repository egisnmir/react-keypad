import { maskNumber } from './utils'

//TODO
describe('Keypad component tests', () => {
  it('tests if the maskNumber function works correctly', () => {
    const unmaskedValue = 1234;
    let maskedValue;

    maskedValue = maskNumber(unmaskedValue);
    
    expect(maskedValue).toBe('***4');
  });
});