import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('Should render ComboBox to type Name', () => {
  render(<App/>);
  const autoComplete = screen.getByLabelText('Name');
  expect(autoComplete).toBeInTheDocument();
  expect(autoComplete.id).toEqual('combo-box-demo');
})

