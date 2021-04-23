import styled, { css } from 'styled-components';

type WrapperProps = {
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white'
    | string;
  iconLeft?: React.SVGProps<SVGSVGElement>;
};

export const Wrapper = styled.div<WrapperProps>`
  display: inline;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ color, theme }) => {
    if (!color)
      return css`
        color: #3e66fb;

        .icon svg path {
          stroke: #3e66fb;
        }

        a:visited {
          color: #3e66fb;
        }
      `;
    switch (color) {
      case 'client':
        return css`
          color: ${theme.colors.client.main};

          .icon svg path {
            stroke: ${theme.colors.client.main};
          }

          a:visited {
            color: ${theme.colors.client.main};
          }
        `;
      case 'productOwner':
        return css`
          color: ${theme.colors.productOwner.main};

          .icon svg path {
            stroke: ${theme.colors.productOwner.main};
          }

          a:visited {
            color: ${theme.colors.productOwner.main};
          }
        `;
      case 'developer':
        return css`
          color: ${theme.colors.developer.main};

          .icon svg path {
            stroke: ${theme.colors.developer.main};
          }

          a:visited {
            color: ${theme.colors.developer.main};
          }
        `;
      case 'admin':
        return css`
          color: ${theme.colors.admin.main};

          .icon svg path {
            stroke: ${theme.colors.admin.main};
          }

          a:visited {
            color: ${theme.colors.admin.main};
          }
        `;
      case 'success':
        return css`
          color: ${theme.colors.success.main};

          .icon svg path {
            stroke: ${theme.colors.success.main};
          }

          a:visited {
            color: ${theme.colors.success.main};
          }
        `;
      case 'warning':
        return css`
          color: ${theme.colors.warning.main};

          .icon svg path {
            stroke: ${theme.colors.warning.main};
          }

          a:visited {
            color: ${theme.colors.warning.main};
          }
        `;
      case 'error':
        return css`
          color: ${theme.colors.error.main};

          .icon svg path {
            stroke: ${theme.colors.error.main};
          }

          a:visited {
            color: ${theme.colors.error.main};
          }
        `;
      case 'black':
        return css`
          color: ${theme.colors.black.main};

          .icon svg path {
            stroke: ${theme.colors.black.main};
          }

          a:visited {
            color: ${theme.colors.black.main};
          }
        `;
      case 'white':
        return css`
          color: ${theme.colors.white.main};

          .icon svg path {
            stroke: ${theme.colors.white.main};
          }

          a:visited {
            color: ${theme.colors.white.main};
          }
        `;
      default:
        return css`
          color: ${color};

          .icon svg path {
            stroke: ${color};
          }

          a:visited {
            color: ${color};
          }
        `;
    }
  }}

  ${({ iconLeft }) => {
    if (iconLeft)
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
    margin-right: 5px;
  }
`;
