import {
  act,
  fireEvent,
  queryByRole,
  render,
  screen
} from '@testing-library/react';
import AsyncAutoComplete from './AsyncAutoComplete';

test('Should render AsyncAutoComplete to be able to enter text', () => {
  render(<AsyncAutoComplete
      data={["Saphira", "Tom", "Betsy-May", "Larry-Huges"]}/>);

  const autoComplete = screen.getByLabelText('Autocomplete Names');

  expect(autoComplete).toBeInTheDocument();
  expect(autoComplete.id).toEqual('asynchronous-demo');
})

test('Should provide only one suggestion when entire input matches', () => {
  render(<AsyncAutoComplete
      data={["Saphira", "Tom", "Betsy-May", "Larry-Huges"]}/>);

  const autoComplete = screen.getByLabelText('Autocomplete Names');
  expect(autoComplete).toBeInTheDocument();
  act(() => {
    /* fire events that update state FIXME */
    fireEvent.input(autoComplete, {target: {value: 'Tom'}})
  });
  expect(autoComplete).toHaveValue('Tom');
})

test('Should provide multiple suggestions when part of input matches', () => {
  /* fire events that update state FIXME */
  render(<AsyncAutoComplete
      data={["Saphira", "Tom", "Betsy-May", "Larry-Huges"]}/>);

  const autoComplete = screen.getByLabelText('Autocomplete Names');
  expect(autoComplete).toBeInTheDocument();

  fireEvent.input(autoComplete, {target: {value: 's'}})
  fireEvent.keyDown(autoComplete, { key: 'ArrowDown' });
  fireEvent.keyDown(autoComplete, { key: 'ArrowDown' });
  fireEvent.keyDown(autoComplete, { key: 'ArrowDown' });
  fireEvent.keyDown(autoComplete, { key: 'Enter' });
  expect(autoComplete).toHaveValue('Larry-Huges');
})
