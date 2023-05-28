import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 75px;
  z-index: 100;
  width: 500px;
  height: 100vh;
  background: ${({ theme, color }) =>
    color ? theme.colors[color].main : theme.colors.client.main};

  .overlay {
    position: fixed;
    top: 0;
    left: 575px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
  }

  .empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }

  .messaging-empty {
    fill: white;
  }
`;
