import { useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Empty } from '../../assets';
import { Box } from '../../components';
import { Wrapper } from './styles';

const Project = () => {
  const role = useReactiveVar(roleVar);

  return role !== 'admin' ? (
    <Wrapper color={role}>
      <Box
        width='100%'
        height='100vh'
        display='grid'
        alignItems='center'
        justifyContent='center'
      >
        <Box>
          <Empty />
        </Box>
      </Box>
    </Wrapper>
  ) : (
    <Redirect to='/clients' />
  );
};

export default Project;
