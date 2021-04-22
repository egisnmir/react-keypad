import './Keypad.css';
import { useState } from 'react';

function Keypad() {
  const [inputValue, setInputValue] = useState('');
  const [wrongAttempts, setWrongAttempts] = 0;
  const [blockedKeypad, setBlockedKeypad] = false;
  const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const pinCode = 1234;

  const maskedValue = maskNumber(inputValue);

  function maskNumber(number) {
    if (number.length <= 1) {
      return number;
    }

    let numString = String(number).split('');

    let maskedNumber = numString.map((digit, idx) => {
      if(numString.length === idx + 1) {
        return digit;
      }
      return '*';
    });

    console.log(maskedNumber);

    maskedNumber = maskedNumber.join('');

    return maskedNumber;
  }

  console.log('Masked value ' + maskedValue);
  console.log('Real value: ' + inputValue);

  const handeInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleButtonClick = (e) => {
    const buttonVal = e.target.innerHTML;

    setInputValue(String(inputValue) + buttonVal);
  }

  const handleSubmitPin = (e) => {
    console.log(e);
    console.log('test');
  }

  const buttonsDOM = buttons.map((button) => {
    return <div className="keypad-button" onClick={handleButtonClick}>{button}</div>
  });

  return (
    <div className="container">
      <div className="Keypad">
        <input
          className="keypad-value"
          onChange={handeInputChange}
          value={maskedValue}>
        </input>
        {buttonsDOM}
        <button className="submit"
        onClick={handleSubmitPin}>Submit</button>
      </div>
    </div>
  );
}

export default Keypad;
