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
  variant?: 'primary-action' | 'secondary-action' | 'outlined' | 'text';
  iconLeft?: React.SVGProps<SVGSVGElement>;
  iconRight?: React.SVGProps<SVGSVGElement>;
  fullWidth?: boolean;
};

export const Wrapper = styled.button<WrapperProps>`
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 6px;
  background: none;
  font-weight: bold;

  .icon svg {
    display: flex;
    align-items: center;
  }

  ${({ iconLeft, iconRight }) => {
    if (iconLeft || iconRight)
      return css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      `;
    return '';
  }}

  .icon {
    display: inline-flex;
    align-items: center;
  }

  .icon.left {
    margin-right: 0.5rem;
  }

  .icon.right {
    margin-left: 0.5rem;
  }

  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          padding: 0.625rem 1.875rem;
          font-size: 1rem;

          .icon svg {
            width: 1rem;
            height: 1rem;
          }
        `;
      case 'big':
        return css`
          padding: 0.625rem 1.875rem;
          font-size: 1.25rem;

          .icon svg {
            width: 1.25rem;
            height: 1.25rem;
          }
        `;
      default:
        return css`
          padding: 0.625rem 1.875rem;
          font-size: 1rem;

          .icon svg {
            width: 1rem;
            height: 1rem;
          }
        `;
    }
  }}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      font-size: 1.25rem;

      .icon svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    `};

  ${({ variant, color, theme }) => {
    switch (variant) {
      case 'primary-action':
        return css`
          background: ${theme.colors[color].main};
          color: ${theme.colors.white.main};

          .icon svg path {
            stroke: ${theme.colors.white.main};
          }

          &:hover {
            background: ${theme.colors[color].dark};
          }
        `;
      case 'secondary-action':
        return css`
          background: ${theme.colors[color].light};
          color: #262628;

          .icon svg path {
            stroke: #262628;
          }
        `;
      case 'outlined':
        return css`
          background: none;
          color: ${theme.colors[color].main};
          border: 2px solid ${theme.colors[color].main};

          .icon svg path {
            stroke: ${theme.colors[color].main};
          }

          &:hover {
            background: ${theme.colors[color].main};
            color: ${theme.colors.white.main};

            .icon svg path {
              stroke: ${theme.colors.white.main};
            }
          }
        `;
      case 'text':
        return css`
          background: none;
          color: ${theme.colors[color].main};
          padding: 0;

          .icon svg path {
            stroke: ${theme.colors[color].main};
          }
        `;
      default:
        return css`
          background: none;
          color: ${theme.colors[color].main};
          padding: 0;

          .icon svg path {
            stroke: ${theme.colors[color].main};
          }
        `;
    }
  }}
`;
