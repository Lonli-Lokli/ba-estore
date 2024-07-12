import { AviosTable } from '@ba-estore/avios-table';
import { Funding } from '@ba-estore/funding';
import styled from 'styled-components';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Funding />
      <AviosTable />
    </StyledApp>
  );
}

export default App;
