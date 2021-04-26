import { render, fireEvent, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import Keypad from './Keypad'

beforeEach(() => {
  render(<Keypad />);
});

test('checks if a single pincode button works', () => {
  const inputEle = screen.getByTestId('keypad-input')
  const button1Ele = screen.getByTestId('button-1')

  fireEvent.click(button1Ele)

  expect(inputEle.value).toBe('1')
});

test('checks if value masking works', () => {
  const inputEle = screen.getByTestId('keypad-input')
  const button1Ele = screen.getByTestId('button-1')
  const button3Ele = screen.getByTestId('button-3')
  const button5Ele = screen.getByTestId('button-5')

  fireEvent.click(button1Ele)
  fireEvent.click(button3Ele)
  fireEvent.click(button5Ele)

  expect(inputEle.value).toBe('**5')
});

test('checks if entering the correct pin works', async () => {
  const button1Ele = screen.getByTestId('button-1')
  const button2Ele = screen.getByTestId('button-2')
  const button3Ele = screen.getByTestId('button-3')
  const button4Ele = screen.getByTestId('button-4')

  fireEvent.click(button1Ele)
  fireEvent.click(button2Ele)
  fireEvent.click(button3Ele)
  fireEvent.click(button4Ele)

  await waitFor(() => {
    expect(screen.getByTestId('success')).toBeInTheDocument()
  })
});

test('check if entering the wrong value shows an error message', async () => {
  const button1Ele = screen.getByTestId('button-1')

  function clickTimes(times, ele) {
    for (let i = 1; i <= times; i++) {
      fireEvent.click(ele)
    }
  }

  //A wrong attempt
  clickTimes(4, button1Ele)

  await waitFor(() => {
    expect(screen.getByTestId('error')).toBeInTheDocument()
  })  
});

test('check if entering the wrong value 3 times blocks the input', async () => {
  const inputEle = screen.getByTestId('keypad-input')
  const button1Ele = screen.getByTestId('button-1')

  function clickTimes(times, ele) {
    for (let i = 1; i <= times; i++) {
      fireEvent.click(ele)
    }
  }

  //Three wrong attempts
  clickTimes(12, button1Ele)

  await waitFor(() => {
    expect(screen.getByTestId('blocked')).toBeInTheDocument()
  })  

  //Fourth wrong attempt
  fireEvent.click(button1Ele)
  fireEvent.click(button1Ele)

  expect(inputEle.value).toBe('')
});