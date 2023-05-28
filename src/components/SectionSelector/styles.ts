import styled, { css } from 'styled-components';

type WrapperProps = {
  icon: React.FunctionComponentElement<React.SVGProps<SVGSVGElement>>;
  color: 'client' | 'productOwner' | 'developer' | 'admin';
  selected: boolean;
  disabled: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  height: auto;
  max-height: 50px;
  padding: 15px 20px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;

  ${({ icon }) => {
    if (icon)
      return css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `;
    return '';
  }}

  .icon svg {
    display: flex;
    align-items: center;
  }

  .icon.left {
    margin-right: 0.5rem;
  }

  ${({ color, theme, selected }) => {
    switch (color) {
      case 'client':
        return css`
          color: ${selected
            ? theme.colors.client.main
            : theme.colors.black.main};
          background: ${selected ? theme.colors.client.light : 'none'};

          svg path {
            stroke: ${selected
              ? theme.colors.client.main
              : theme.colors.black.main};
          }
        `;
      case 'productOwner':
        return css`
          color: ${selected
            ? theme.colors.productOwner.main
            : theme.colors.black.main};
          background: ${selected ? theme.colors.productOwner.light : 'none'};

          svg path {
            stroke: ${selected
              ? theme.colors.productOwner.main
              : theme.colors.black.main};
          }
        `;
      case 'developer':
        return css`
          color: ${selected
            ? theme.colors.developer.main
            : theme.colors.black.main};
          background: ${selected ? theme.colors.developer.light : 'none'};

          svg path {
            stroke: ${selected
              ? theme.colors.developer.main
              : theme.colors.black.main};
          }
        `;
      case 'admin':
        return css`
          color: ${selected
            ? theme.colors.admin.main
            : theme.colors.black.main};
          background: ${selected ? theme.colors.admin.light : 'none'};

          svg path {
            stroke: ${selected
              ? theme.colors.admin.main
              : theme.colors.black.main};
          }
        `;
      default:
        return css`
          color: ${selected
            ? theme.colors.client.main
            : theme.colors.black.main};
          background: ${selected ? theme.colors.client.light : 'none'};

          svg path {
            stroke: ${selected
              ? theme.colors.client.main
              : theme.colors.black.main};
          }
        `;
    }
  }}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: default;
      color: ${theme.colors.gray.main};
      background: none;

      svg path {
        stroke: ${theme.colors.gray.main};
      }
    `};
`;
