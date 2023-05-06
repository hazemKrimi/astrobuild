import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 75px;
  height: 100%;
  background: ${({ theme, color }) =>
    color ? theme.colors[color].light : theme.colors.client.light};
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
  padding: 55px 0px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px;
  }
`;
