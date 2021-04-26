export const maskNumber = (number) => {
  if (number.length <= 1) {
    return number;
  }

  let numString = String(number).split('');

  let maskedNum = numString.map((digit, idx) => {
    if (numString.length === idx + 1) {
      return digit;
    }
    return '*';
  });

  return maskedNum.join('');
}
