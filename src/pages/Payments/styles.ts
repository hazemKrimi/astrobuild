import styled from 'styled-components';

export const Wrapper = styled.div`
  .empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }
`;
