import { render, fireEvent, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import App from './App';

describe('Keypad component', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('checks if a single pincode button works', () => {
    const inputEle = screen.getByTestId('keypad-input')
    const button1Ele = screen.getByTestId('button-1')

    fireEvent.click(button1Ele)

    expect(inputEle.value).toBe('1')
  });

  it('checks if value masking works', () => {
    const inputEle = screen.getByTestId('keypad-input')
    const button1Ele = screen.getByTestId('button-1')
    const button3Ele = screen.getByTestId('button-3')
    const button5Ele = screen.getByTestId('button-5')

    fireEvent.click(button1Ele)
    fireEvent.click(button3Ele)
    fireEvent.click(button5Ele)

    expect(inputEle.value).toBe('**5')
  });
  
  it('checks if entering the correct pin works', async () => {
    const button1Ele = screen.getByTestId('button-1')
    const button2Ele = screen.getByTestId('button-2')
    const button3Ele = screen.getByTestId('button-3')
    const button4Ele = screen.getByTestId('button-4')

    fireEvent.click(button1Ele)
    fireEvent.click(button2Ele)
    fireEvent.click(button3Ele)
    fireEvent.click(button4Ele)

    const successEle = await waitFor(() => screen.getByTestId('success'), {
      timeout: 1000
    });
    expect(successEle).toBeInTheDocument()
  });

  it('check if entering the wrong value shows an error message', async () => {
    const button1Ele = screen.getByTestId('button-1')

    function clickTimes(times, ele) {
      for(let i = 1; i <= times; i++) {
        fireEvent.click(ele)
      }
    }

    //A wrong attempt
    clickTimes(4, button1Ele)

    const errorEle = await waitFor(() => screen.getByTestId('error'), {
      timeout: 1000
    });
    expect(errorEle).toBeInTheDocument()
  });

  it('check if entering the wrong value 3 times blocks the input', async () => {
    const inputEle = screen.getByTestId('keypad-input')
    const button1Ele = screen.getByTestId('button-1')

    function clickTimes(times, ele) {
      for(let i = 1; i <= times; i++) {
        fireEvent.click(ele)
      }
    }

    //Three wrong attempts
    clickTimes(12, button1Ele)

    const blockedEle = await waitFor(() => screen.getByTestId('blocked'), {
      timeout: 1000
    });
    expect(blockedEle).toBeInTheDocument()

    //Fourth wrong attempt
    fireEvent.click(button1Ele)
    fireEvent.click(button1Ele)

    expect(inputEle.value).toBe('')
  });
})