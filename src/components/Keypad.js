import './Keypad.css';
import { useState } from 'react';
import { maskNumber } from '../utils/utils';

function Keypad() {
  const [pincode, setPin] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const BUTTONS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const CORRECT_PIN = 1234;
  const LOCK_TIME = 5000;

  const maskedPin = maskNumber(pincode);

  function validatePin(pin) {
    if (pin.length === 4) {
      if (pin == CORRECT_PIN) {
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

      setPin('');
      return true;
    }
  }

  const handePinChange = (e) => {
    if (blocked) {
      console.log('Keypad is temporarily blocked');
      return;
    }

    setPin(e.target.value);
  }

  const blockKeyboard = () => {
    console.log('Keypad blocked for ' + LOCK_TIME / 1000 + ' seconds');
    setBlocked(true);

    setTimeout(() => {
      console.log('Keypad unblocked');
      setBlocked(false);
      setError(false);
      setWrongAttempts(0);
    }, LOCK_TIME);
  }

  const handleButtonClick = (e) => {
    if (blocked || success) {
      return;
    }

    if (error) {
      setError(false);
    }

    const newPinVal = pincode + e.target.innerHTML;

    if (!validatePin(newPinVal)) {
      setPin(newPinVal);
    };
  }

  const statusDOM = () => {
    if (success) {
      return <div className="success" data-testid="success">Success</div>;
    }
    if (error && !blocked) {
      return <div className="error" data-testid="error">Error</div>
    }
    if (blocked) {
      return <div className="error" data-testid="blocked">Blocked</div>;
    }
  }

  const buttonsDOM = BUTTONS.map((button, idx) => {
    return <div
      className="keypad-button"
      key={idx}
      onClick={handleButtonClick}
      data-testid={"button-" + button}
    >{button}</div>
  });

  return (
    <div className="container">
      <div className="Keypad">
        {statusDOM()}
        <input
          className="keypad-input"
          onChange={handePinChange}
          value={maskedPin}
          data-testid="keypad-input"
          disabled>
        </input>
        {buttonsDOM}
      </div>
    </div>
  );
}

export default Keypad;
