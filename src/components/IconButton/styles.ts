import styled, { css } from 'styled-components';

type WrapperProps = {
  color:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'small' | 'big';
  icon?: React.SVGProps<SVGSVGElement>;
};

export const Wrapper = styled.button<WrapperProps>`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 50%;
  background: none;
  font-weight: bold;
  background: ${({ theme, color }) => theme.colors[color].main};
  display: grid;
  justify-content: center;
  align-items: center;

  svg {
    display: flex;
    align-items: center;

    path {
      stroke: ${({ theme }) => theme.colors.white.main};
    }
  }

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: 25px;
          height: 25px;

          svg {
            width: 12.5px;
            height: 12.5px;
          }
        `;
      case 'big':
        return css`
          width: 50px;
          height: 50px;

          svg {
            width: 24.5px;
            height: 24.5px;
          }
        `;
      default:
        return css`
          width: 25px;
          height: 25px;

          svg {
            width: 12.5px;
            height: 12.5px;
          }
        `;
    }
  }}
`;
