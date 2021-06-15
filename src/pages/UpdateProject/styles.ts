import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  .carousel-arrow {
    background: none;
    border: none;
    align-self: center;
    cursor: pointer;

    svg {
      stroke: ${({ theme, color }) => theme.colors[color || 'client'].main};
    }
  }
`;
