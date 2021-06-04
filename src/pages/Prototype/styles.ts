import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  .empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }

  .frontend-feature-odd {
    justify-self: flex-end;
  }

  .frontend-feature-even {
    justify-self: flex-start;
  }

  .frontend-feature-even,
  .frontend-feature-odd {
    &:hover {
      border: 2px solid
        ${({ theme, color }) =>
          color ? theme.colors[color].main : theme.colors.client.main};
    }
  }
`;
