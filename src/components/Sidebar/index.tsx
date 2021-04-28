import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../../graphql/state';
import { IconButton } from '..';
import { Add } from '../../assets';
import { Wrapper } from './styles';

const Sidebar = () => {
  const role = useReactiveVar(roleVar);

  return (
    <Wrapper color={role}>
      <IconButton icon={<Add />} color={role} onClick={() => {}} />
    </Wrapper>
  );
};

export default Sidebar;
