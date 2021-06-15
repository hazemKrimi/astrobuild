import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  .empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }

  .deliverables {
    svg path {
      stroke: black;
    }
  }
`;
