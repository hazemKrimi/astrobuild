import React from 'react';
import { Wrapper } from './styles';

export type BoxProps = {
  className?: string;
  children?: React.ReactNode | JSX.Element | string;

  onClick?: () => void;
  cursor?: 'pointer' | 'default';

  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;

  transformOrigin?: string;
  transform?: string;

  display?: 'none' | 'block' | 'inline' | 'inline-block' | 'flex' | 'grid';

  flex?: string;
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'unwrap';
  flexGrow?: string;
  flexShrink?: string;
  order?: string;

  gridRow?: string;
  gridColumn?: string;
  gridTemplate?: string;
  gridTemplateRows?: string;
  gridTemplateColumns?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;

  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  alignSelf?: 'center' | 'flex-start' | 'flex-end';
  justifySelf?: 'center' | 'flex-start' | 'flex-end';

  boxSizing?: 'content-box' | 'border-box';
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;

  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;

  overflow?: 'visible' | 'hidden' | 'scroll';
  overflowX?: 'visible' | 'hidden' | 'scroll';
  overflowY?: 'visible' | 'hidden' | 'scroll';

  border?: string;
  borderRadius?: string;
  boxShadow?: string;

  color?: string;
  background?: string;

  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: 'center' | 'left' | 'right';
  textDecoration?: string;
};

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);

export default Box;
