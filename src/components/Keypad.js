import './Keypad.css';
import { useState } from 'react';

function Keypad() {
  const [pincode, setPincode] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [blockedKeypad, setBlockedKeypad] = useState(false);
  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const realPin = 1234;
  const keypadLockTime = 5000;

  const maskedPincode = maskNumber(pincode);

  function maskNumber(number) {
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

  const handePincodeChange = (e) => {
    if (blockedKeypad) {
      console.log('Keypad is temporarily');
      return;
    }

    setPincode(e.target.value);
  }

  const blockKeyboard = () => {
    console.log('Keypad blocked for ' + keypadLockTime / 1000 + ' seconds');
    setBlockedKeypad(true);

    setTimeout(() => {
      console.log('Keypad unblocked');
      setBlockedKeypad(false);
      setError(false);
      setWrongAttempts(0);
    }, keypadLockTime);
  }

  const handleButtonClick = (e) => {
    if (blockedKeypad || success) {
      return;
    }

    if (error) {
      setError(false);
    }

    const newVal = pincode + e.target.innerHTML;

    if (newVal.length === 4) {
      if (newVal == realPin) {
        setWrongAttempts(0);
        setSuccess(true);
      } else {
        let wrong = wrongAttempts + 1;
        setWrongAttempts(wrong);

        setError(true);

        if (wrong === 3) {
          blockKeyboard();
        }
      }

      setPincode('');
      return;
    }

    setPincode(newVal);
  }

  const statusDOM = () => {
    if(success) {
      return <div className="success">OK</div>;
    }
    if(error && !blockedKeypad) {
      return <div className="error">ERROR</div>
    }
    if(blockedKeypad) {
      return <div className="error">BLOCKED</div>;
    }
  }

  const buttonsDOM = buttons.map((button, idx) => {
    return <div className="keypad-button" key={idx} onClick={handleButtonClick}>{button}</div>
  });

  return (
    <div className="container">
      <div className="Keypad">
        {statusDOM()}
        <input
          className="keypad-input"
          onChange={handePincodeChange}
          value={maskedPincode}
          disabled>
        </input>
        {buttonsDOM}
      </div>
    </div>
  );
}

export default Keypad;
