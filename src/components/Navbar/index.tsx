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
              color={
                new RegExp('clients', 'i').test(location.pathname)
                  ? 'admin'
                  : 'black'
              }
              selected={new RegExp('clients', 'i').test(location.pathname)}
            >
              Clients
            </Link>
            <Link
              href='/product-owners'
              color={
                new RegExp('product-owners', 'i').test(location.pathname)
                  ? 'admin'
                  : 'black'
              }
              selected={new RegExp('product-owners', 'i').test(
                location.pathname
              )}
            >
              Product Owners
            </Link>
            <Link
              href='/developers'
              color={
                new RegExp('developers', 'i').test(location.pathname)
                  ? 'admin'
                  : 'black'
              }
              selected={new RegExp('developers', 'i').test(location.pathname)}
            >
              Developers
            </Link>
          </>
        )}
        {role === 'developer' && (
          <>
            <Link
              href='/project'
              color={
                new RegExp('project', 'i').test(location.pathname)
                  ? 'developer'
                  : 'black'
              }
              selected={new RegExp('project', 'i').test(location.pathname)}
            >
              Projects
            </Link>
            <Link
              href='/template'
              color={
                new RegExp('template', 'i').test(location.pathname)
                  ? 'developer'
                  : 'black'
              }
              selected={new RegExp('template', 'i').test(location.pathname)}
            >
              Templates
            </Link>
            <Link
              href='/feature'
              color={
                new RegExp('feature', 'i').test(location.pathname)
                  ? 'developer'
                  : 'black'
              }
              selected={new RegExp('feature', 'i').test(location.pathname)}
            >
              Features
            </Link>
            <Link
              href='/category'
              color={
                new RegExp('category', 'i').test(location.pathname)
                  ? 'developer'
                  : 'black'
              }
              selected={new RegExp('category', 'i').test(location.pathname)}
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
                new RegExp('project', 'i').test(location.pathname)
                  ? 'productOwner'
                  : 'black'
              }
              selected={new RegExp('project', 'i').test(location.pathname)}
            >
              Projects
            </Link>
            <Link
              href='/template'
              color={
                new RegExp('template', 'i').test(location.pathname)
                  ? 'productOwner'
                  : 'black'
              }
              selected={new RegExp('template', 'i').test(location.pathname)}
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
