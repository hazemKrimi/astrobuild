import { useReactiveVar } from '@apollo/client';
import { useHistory } from 'react-router';
import { roleVar, tokenVar, userVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Avatar, Link, Menu, Text } from '..';
import { Settings, Logout, Logo } from '../../assets';

const Navbar = () => {
  const user = useReactiveVar(userVar);
  const role = useReactiveVar(roleVar);
  const history = useHistory();

  return (
    <Wrapper color={role}>
      <Link href='/'>
        <Logo />
      </Link>
      <div className='menu'></div>
      <div className='user' id='user'>
        <Avatar
          text={
            (user?.firstName && user?.firstName[0].toLocaleUpperCase()) ||
            (role && role[0].toLocaleUpperCase()) ||
            'C'
          }
          color={role}
        />
        <Text variant='body' weight='bold'>
          {user?.firstName} {user?.lastName}
        </Text>
      </div>
      <Menu
        component='user'
        items={[
          {
            icon: <Settings />,
            label: 'Settings',
            action: () => history.push('/settings'),
          },
          {
            icon: <Logout />,
            label: 'Logout',
            action: () => {
              tokenVar(undefined);
              localStorage.removeItem('token');
              history.push('/login');
            },
            avoid: true,
          },
        ]}
      />
    </Wrapper>
  );
};

export default Navbar;
