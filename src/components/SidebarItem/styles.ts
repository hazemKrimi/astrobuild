import styled, { css } from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'medium' | 'big';
};

export const Wrapper = styled.button<WrapperProps>`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 50%;
  background: none;
  font-weight: bold;
  background: ${({ theme, color }) =>
    color ? theme.colors[color].main : theme.colors.client.main};
  color: ${({ theme }) => theme.colors.white.main};
  display: grid;
  justify-content: center;
  align-items: center;

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 25px;
          height: 25px;
        `;
      case 'medium':
        return css`
          width: 35px;
          height: 35px;
        `;
      case 'big':
        return css`
          width: 50px;
          height: 50px;
        `;
      default:
        return css`
          width: 25px;
          height: 25px;
        `;
    }
  }}
`;
