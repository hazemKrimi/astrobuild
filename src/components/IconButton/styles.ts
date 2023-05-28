import styled, { css } from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  size?: 'small' | 'medium' | 'big';
  icon?: React.FunctionComponentElement<React.SVGProps<SVGSVGElement>>;
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
      case 'medium':
        return css`
          width: 35px;
          height: 35px;

          svg {
            width: 17.5px;
            height: 17.5px;
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
