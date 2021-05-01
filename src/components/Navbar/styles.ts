import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  withSidebar: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  background: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: ${({ withSidebar }) =>
    withSidebar ? '15px 45px 15px 120px' : '15px 45px'};
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 99;

  svg {
    display: flex;
    align-items: center;
  }

  .logo-icon {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }

  .user {
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
      margin-left: 5px;
    }
  }
`;
