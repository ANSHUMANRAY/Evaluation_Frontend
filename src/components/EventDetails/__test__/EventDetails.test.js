import React from 'react';
import {render} from '@testing-library/react';
import EventDetails from '../index';
import { ThemeContext } from '../../../contexts/themeContext';
import { mockEvent } from '../../../mocks/mockEvents';
import axios from 'axios';

jest.mock('axios');

describe('EventDetails', () => {
  it('should render correctly', () => {
    axios.get.mockResolvedValue({data: mockEvent});
    const {container} = render(<ThemeContext.Provider value={{theme: 'black', setTheme: jest.fn()}}><EventDetails/></ThemeContext.Provider>);
    expect(container).toMatchSnapshot();
  });
});