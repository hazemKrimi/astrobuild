import { useReactiveVar } from '@apollo/client';
import { useHistory } from 'react-router';
import { roleVar, tokenVar, userVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Avatar, Link, Menu, Text } from '..';
import { Settings, Logout, Logo } from '../../assets';

type NavbarProps = {
  withSidebar: boolean;
};

const Navbar = ({ withSidebar }: NavbarProps) => {
  const user = useReactiveVar(userVar);
  const role = useReactiveVar(roleVar);
  const history = useHistory();

  return (
    <Wrapper color={role} withSidebar={withSidebar}>
      <Link href='/'>
        <Logo />
      </Link>
      <div className='menu'></div>
      <div className='user' id='user'>
        <Avatar text='H' color={role} />
        <Text variant='body' weight='bold'>
          {user?.firstName} {user?.lastName}
        </Text>
      </div>
      <Menu
        component='user'
        items={
          role !== 'admin'
            ? [
                { icon: <Settings />, label: 'Settings', action: () => {} },
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
              ]
            : [
                {
                  icon: <Logout />,
                  label: 'Logout',
                  action: () => {
                    tokenVar(undefined);
                    history.push('/login');
                  },
                  avoid: true,
                },
              ]
        }
      />
    </Wrapper>
  );
};

export default Navbar;
