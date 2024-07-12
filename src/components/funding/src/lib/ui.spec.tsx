import { render } from '@testing-library/react';

import { Funding } from './ui';

describe('Funding', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Funding />);
    expect(baseElement).toBeTruthy();
  });
});
