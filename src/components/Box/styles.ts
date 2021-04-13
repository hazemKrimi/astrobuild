import styled from 'styled-components';
import { BoxProps } from '.';

export const Wrapper = styled.div<BoxProps>`
  ${({ position }) => position && `position: ${position}`};
  ${({ zIndex }) => zIndex && `z-index: ${zIndex}`};
  ${({ top }) => top && `top: ${top}`};
  ${({ right }) => right && `right: ${right}`};
  ${({ bottom }) => bottom && `bottom: ${bottom}`};
  ${({ left }) => left && `left: ${left}`};

  ${({ transformOrigin }) =>
    transformOrigin && `transform-origin: ${transformOrigin}`};
  ${({ transform }) => transform && `transform: ${transform}`};

  ${({ display }) => display && `display: ${display}`};

  ${({ flex }) => flex && `flex: ${flex}`};
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection}`};
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap}`};
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`};
  ${({ flexShrink }) => flexShrink && `flex-shrink: ${flexShrink}`};
  ${({ order }) => order && `order: ${order}`};

  ${({ gridRow }) => gridRow && `grid-row: ${gridRow}`};
  ${({ gridColumn }) => gridColumn && `grid-column: ${gridColumn}`};
  ${({ gridTemplate }) => gridTemplate && `grid-template: ${gridTemplate}`};
  ${({ gridTemplateRows }) =>
    gridTemplateRows && `grid-template-rows: ${gridTemplateRows}`};
  ${({ gridTemplateColumns }) =>
    gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns}`};
  ${({ gap }) => gap && `gap: ${gap}`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}`};
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}`};

  ${({ alignItems }) => alignItems && `align-items: ${alignItems}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};

  ${({ boxSizing }) => boxSizing && `box-sizing: ${boxSizing}`};
  ${({ width }) => width && `width: ${width}`};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth}`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ minHeight }) => minHeight && `min-height: ${minHeight}`};
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}`};

  ${({ margin }) => margin && `margin: ${margin}`};
  ${({ marginTop }) => marginTop && `margin-top: ${marginTop}`};
  ${({ marginRight }) => marginRight && `margin-right: ${marginRight}`};
  ${({ marginBottom }) => marginBottom && `margin-bottom: ${marginBottom}`};
  ${({ marginLeft }) => marginLeft && `margin-left: ${marginLeft}`};
  ${({ padding }) => padding && `padding: ${padding}`};
  ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop}`};
  ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight}`};
  ${({ paddingBottom }) => paddingBottom && `padding-bottom: ${paddingBottom}`};
  ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft}`};

  ${({ overflow }) => overflow && `overflow: ${overflow}`};
  ${({ overflowX }) => overflowX && `overflow-x: ${overflowX}`};
  ${({ overflowY }) => overflowY && `overflow-y: ${overflowY}`};

  ${({ border }) => border && `border: ${border}`};
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius}`};
  ${({ boxShadow }) => boxShadow && `box-shadow: ${boxShadow}`};

  ${({ color }) => color && `color: ${color}`};
  ${({ background }) => background && `background: ${background}`};

  ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily}`};
  ${({ fontSize }) => fontSize && `font-size: ${fontSize}`};
  ${({ fontWeight }) => fontWeight && `font-weight: ${fontWeight}`};
  ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle}`};
  ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}`};
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing}`};
  ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
  ${({ textDecoration }) =>
    textDecoration && `text-decoration: ${textDecoration}`};
`;
