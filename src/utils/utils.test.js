import { maskNumber } from './utils'

//TODO
describe('Keypad component tests', () => {
  it('tests if the maskNumber function works correctly', () => {
    const maskedValue = maskNumber(1234);

    expect(maskedValue).toBe('***4');
  });
});