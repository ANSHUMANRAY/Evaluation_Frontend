import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../index';
import axios from 'axios';
import { ThemeContext } from '../../../contexts/themeContext';
import { mockThemes } from '../../../mocks/mockThemes';

jest.mock('axios');

describe('Footer', () => {
  it('should render correctly', () => {
    axios.get.mockResolvedValue({ data: mockThemes });
    const { container } = render(
      <ThemeContext.Provider value={{ theme: 'black', setTheme: jest.fn() }}>
        <Footer />
      </ThemeContext.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
