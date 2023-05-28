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
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  display?: 'initial' | 'block' | 'inline';
  gutterBottom?: boolean;
  lineThrough?: boolean;
  weight?: 'initial' | 'normal' | 'bold' | number;
};

export const Wrapper = styled.p<WrapperProps>`
  ${({ color, theme }) => {
    if (!color)
      return css`
        color: inherit;
      `;
    switch (color) {
      case 'client':
        return css`
          color: ${theme.colors.client.main};
        `;
      case 'productOwner':
        return css`
          color: ${theme.colors.productOwner.main};
        `;
      case 'developer':
        return css`
          color: ${theme.colors.developer.main};
        `;
      case 'admin':
        return css`
          color: ${theme.colors.admin.main};
        `;
      case 'success':
        return css`
          color: ${theme.colors.success.main};
        `;
      case 'warning':
        return css`
          color: ${theme.colors.warning.main};
        `;
      case 'error':
        return css`
          color: ${theme.colors.error.main};
        `;
      case 'black':
        return css`
          color: ${theme.colors.black.main};
        `;
      case 'white':
        return css`
          color: ${theme.colors.white.main};
        `;
      default:
        return css`
          color: ${color};
        `;
    }
  }}

  ${({ display }) =>
    display
      ? css`
          display: ${display};
        `
      : css`
          display: block;
        `}

  ${({ gutterBottom }) =>
    gutterBottom &&
    css`
      margin-bottom: 0.35rem;
    `};

  ${({ lineThrough }) =>
    lineThrough &&
    css`
      text-decoration: line-through;
    `};

  ${({ align }) =>
    align
      ? css`
          align: ${align};
        `
      : css`
          align: initial;
        `}

  ${({ weight }) =>
    weight
      ? css`
          font-weight: ${weight};
        `
      : css`
          font-weight: initial;
        `}

  &.display {
    font-size: 2.25rem;
    line-height: 3rem;
  }

  &.headline {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &.title {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  &.subheader {
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &.body {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &.caption {
    font-size: 0.75rem;
    line-height: 1rem;
  }
`;
