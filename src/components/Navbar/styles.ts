import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  background: ${({ theme }) => theme.colors.white.main};
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 45px 15px 120px;
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

  nav {
    flex-grow: 1;
    margin-left: 60px;
    display: grid;
    grid-template-columns: repeat(4, auto);
    column-gap: 20px;
    justify-content: flex-start;
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
