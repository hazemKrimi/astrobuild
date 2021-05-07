import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  empty: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  padding: ${({ empty }) => (empty ? '0px' : '35px 45px 35px 120px')};

  .table-head {
    p {
      background: ${({ theme }) => theme.colors.gray.dark};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }
`;
