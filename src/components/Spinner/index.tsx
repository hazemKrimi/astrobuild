import { Wrapper } from './styles';

type SpinnerProps = {
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'white'
    | 'black'
    | 'gray';
  fullScreen?: boolean;
};

const Spinner = ({ fullScreen = false, color = 'client' }: SpinnerProps) => {
  return (
    <Wrapper fullScreen={fullScreen} color={color}>
      <div className='lds-dual-ring'></div>
    </Wrapper>
  );
};

export default Spinner;
