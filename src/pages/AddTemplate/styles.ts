import styled from 'styled-components';

type WrapperProps = {
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
};

export const Wrapper = styled.div<WrapperProps>`
  padding: 35px 45px 35px 120px;

	.empty {
    fill: ${({ theme, color }) =>
      color ? theme.colors[color].main : theme.colors.client.main};
  }
`;
