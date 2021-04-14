import styled, { css } from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin' | string;
  error?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  iconLeft?: React.SVGProps<SVGSVGElement>;
};

export const Wrapper = styled.div<WrapperProps>`
  display: inline;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.black.main};

  input {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.black.main};
  }

  ${({ color, theme }) => {
    if (!color)
      return css`
        border: 2px solid ${theme.colors.client.light};
      `;
    switch (color) {
      case 'client':
        return css`
          border: 2px solid ${theme.colors.client.light};
        `;
      case 'productOwner':
        return css`
          border: 2px solid ${theme.colors.productOwner.light};
        `;
      case 'developer':
        return css`
          border: 2px solid ${theme.colors.developer.light};
        `;
      case 'admin':
        return css`
          border: 2px solid ${theme.colors.admin.light};
        `;
      case 'success':
        return css`
          border: 2px solid ${theme.colors.success.main};
        `;
      case 'warning':
        return css`
          border: 2px solid ${theme.colors.warning.main};
        `;
      case 'error':
        return css`
          border: 2px solid ${theme.colors.error.main};
        `;
      case 'black':
        return css`
          border: 2px solid ${theme.colors.black.main};
        `;
      case 'white':
        return css`
          border: 2px solid ${theme.colors.white.main};
        `;
      default:
        return css`
          border: 2px solid ${color};
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
`;
