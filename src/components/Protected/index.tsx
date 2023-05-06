import { useReactiveVar } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { tokenVar } from '../../graphql/state';

type Props = {
  children: React.ReactNode;
};

const Protected = ({ children }: Props) => {
  const token = useReactiveVar(tokenVar);

  return (
    <>
      {token ? children : <Navigate to='/login' />}
    </>
  );
};

export default Protected;
