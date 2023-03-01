import React from 'react';
import {render} from '@testing-library/react';
import Event from '../index';
import { ThemeContext } from '../../../contexts/themeContext';
import { mockEvent } from '../../../mocks/mockEvents';

const mockNavigate= jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Event', () => {
  it('should render correctly', () => {
    const {container} = render(<ThemeContext.Provider value={{theme: 'black', setTheme: jest.fn()}}><Event event={mockEvent}/></ThemeContext.Provider>);
    expect(container).toMatchSnapshot();
  });
});