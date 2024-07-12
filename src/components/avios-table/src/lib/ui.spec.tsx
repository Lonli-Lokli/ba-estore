import { render } from '@testing-library/react';

import { AviosTable } from './ui';

describe('AviosTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AviosTable />);
    expect(baseElement).toBeTruthy();
  });
});
