import React from 'react';
import { render } from '@testing-library/react';
import Header from '../index';
import { ThemeContext } from '../../../contexts/themeContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Header', () => {
  it('should render correctly', () => {
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'black', setTheme: jest.fn() }}>
        <Header />
      </ThemeContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});