import styled, { css } from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  size?: 'small' | 'big';
};

export const Wrapper = styled.div<WrapperProps>`
  user-select: none;
  border-radius: 50%;
  background: ${({ theme, color }) =>
    color ? theme.colors[color].main : theme.colors.client.main};
  color: ${({ theme }) => theme.colors.white.main};
  display: inline-grid;
  justify-content: center;
  align-items: center;
  font-weight: bold;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 25px;
          height: 25px;
          font-size: 12px;
        `;
      case 'big':
        return css`
          width: 50px;
          height: 50px;
          font-size: 24px;
        `;
      default:
        return css`
          width: 25px;
          height: 25px;
          font-size: 12px;
        `;
    }
  }}
`;
