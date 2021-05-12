import { useReactiveVar } from '@apollo/client';
import { useHistory, useLocation } from 'react-router';
import { roleVar, tokenVar, userVar } from '../../graphql/state';
import { Wrapper } from './styles';
import { Avatar, Link, Menu, Text } from '..';
import { Settings, Logout, Logo } from '../../assets';

const Navbar = () => {
  const user = useReactiveVar(userVar);
  const role = useReactiveVar(roleVar);
  const history = useHistory();
  const location = useLocation();

  return (
    <Wrapper color={role}>
      <Link href='/'>
        <Logo />
      </Link>
      <nav>
        {role === 'admin' && (
          <>
            <Link
              href='/clients'
              color={location.pathname === '/clients' ? 'admin' : 'black'}
              selected={location.pathname === '/clients'}
            >
              Clients
            </Link>
            <Link
              href='/product-owners'
              color={
                location.pathname === '/product-owners' ? 'admin' : 'black'
              }
              selected={location.pathname === '/product-owners'}
            >
              Product Owners
            </Link>
            <Link
              href='/developers'
              color={location.pathname === '/developers' ? 'admin' : 'black'}
              selected={location.pathname === '/developers'}
            >
              Developers
            </Link>
          </>
        )}
        {role === 'developer' && (
          <>
            <Link
              href='/project'
              color={location.pathname === '/project' ? 'developer' : 'black'}
              selected={location.pathname === '/project'}
            >
              Projects
            </Link>
            <Link
              href='/template'
              color={location.pathname === '/template' ? 'developer' : 'black'}
              selected={location.pathname === '/template'}
            >
              Templates
            </Link>
            <Link
              href='/feature'
              color={location.pathname === '/feature' ? 'developer' : 'black'}
              selected={location.pathname === '/feature'}
            >
              Features
            </Link>
            <Link
              href='/category'
              color={location.pathname === '/category' ? 'developer' : 'black'}
              selected={location.pathname === '/category'}
            >
              Categories
            </Link>
          </>
        )}
        {role === 'productOwner' && (
          <>
            <Link
              href='/project'
              color={
                location.pathname === '/project' ? 'productOwner' : 'black'
              }
              selected={location.pathname === '/project'}
            >
              Projects
            </Link>
            <Link
              href='/template'
              color={
                location.pathname === '/template' ? 'productOwner' : 'black'
              }
              selected={location.pathname === '/template'}
            >
              Templates
            </Link>
          </>
        )}
      </nav>
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
