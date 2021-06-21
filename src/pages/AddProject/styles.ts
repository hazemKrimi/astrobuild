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

  .wireframe {
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;
