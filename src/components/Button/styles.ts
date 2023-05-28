import styled, { css } from 'styled-components';

type WrapperProps = {
  color: 'client' | 'productOwner' | 'developer' | 'admin' | 'error';
  size?: 'small' | 'big';
  variant?: 'primary-action' | 'secondary-action' | 'outlined' | 'text';
  iconLeft?: React.FunctionComponentElement<React.SVGProps<SVGSVGElement>>;
  iconRight?: React.FunctionComponentElement<React.SVGProps<SVGSVGElement>>;
  load?: boolean;
  disabled?: boolean;
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

  ${({ iconLeft, iconRight, load }) => {
    if (iconLeft || iconRight || load)
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

  .lds-dual-ring {
    display: inline !important;

    border-width: 2px !important;
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

          .lds-dual-ring {
            width: 1rem !important;
            height: 1rem !important;

            &:after {
              width: 0.5rem !important;
              height: 0.5rem !important;
            }
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

          .lds-dual-ring {
            width: 1.25rem !important;
            height: 1.25rem !important;

            &:after {
              width: 0.75rem !important;
              height: 0.75rem !important;
            }
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

          .lds-dual-ring {
            width: 1rem !important;
            height: 1rem !important;

            &:after {
              width: 0.5rem !important;
              height: 0.5rem !important;
            }
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

      .lds-dual-ring {
        width: 1.25rem;
        height: 1.25rem;
      }
    `};

  ${({ variant, color, theme, disabled }) => {
    switch (variant) {
      case 'primary-action':
        return css`
          background: ${!disabled
            ? theme.colors[color].main
            : theme.colors[color].light};
          color: ${theme.colors.white.main};

          .icon svg path {
            stroke: ${theme.colors.white.main};
          }

          &:hover {
            background: ${!disabled
              ? theme.colors[color].dark
              : theme.colors[color].light};
          }
        `;
      case 'secondary-action':
        return css`
          background: ${theme.colors[color].light};
          color: ${!disabled ? '#262628' : theme.colors[color].light};

          .icon svg path {
            stroke: ${!disabled ? '#262628' : theme.colors[color].light};
          }
        `;
      case 'outlined':
        return css`
          background: none;
          color: ${!disabled
            ? theme.colors[color].main
            : theme.colors[color].light};
          border: 2px solid
            ${!disabled ? theme.colors[color].main : theme.colors[color].light};

          .icon svg path {
            stroke: ${!disabled
              ? theme.colors[color].main
              : theme.colors[color].light};
          }

          &:hover {
            background: ${!disabled ? theme.colors[color].main : 'none'};
            color: ${!disabled
              ? theme.colors.white.main
              : theme.colors[color].light};

            .icon svg path {
              stroke: ${!disabled
                ? theme.colors.white.main
                : theme.colors[color].light};
            }
          }
        `;
      case 'text':
        return css`
          background: none;
          color: ${!disabled
            ? theme.colors[color].main
            : theme.colors[color].light};
          padding: 0;

          .icon svg path {
            stroke: ${!disabled
              ? theme.colors[color].main
              : theme.colors[color].light};
          }
        `;
      default:
        return css`
          background: none;
          color: ${!disabled
            ? theme.colors[color].main
            : theme.colors[color].light};
          padding: 0;

          .icon svg path {
            stroke: ${!disabled
              ? theme.colors[color].main
              : theme.colors[color].light};
          }
        `;
    }
  }}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}
`;
