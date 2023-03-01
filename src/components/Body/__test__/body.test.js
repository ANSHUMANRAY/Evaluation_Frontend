import React from 'react';
import Body from '../index';
import {render} from '@testing-library/react';

describe('Body', () => {
  it('should render correctly', () => {
    const {container} = render(<Body />);
    expect(container).toMatchSnapshot();
  });
});