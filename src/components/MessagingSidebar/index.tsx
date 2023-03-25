import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import { roleVar } from '../../graphql/state';
import { Box, Button, Text } from '..';
import { Wrapper } from './styles';
import {
  GetProjectThreadsQuery,
  GetProjectThreadsQueryVariables,
  ThreadObject,
} from '../../graphql/types.support';
import { GET_PROJECT_THREADS } from '../../graphql/chat.api.support';
import { Add, Empty } from '../../assets';
import { clientSupport } from '../..';

type MessagingSidebarProps = {
  onClose: () => void;
};

const MessagingSidebar = ({ onClose }: MessagingSidebarProps) => {
  const role = useReactiveVar(roleVar);
  const location = useLocation();
  const navigate = useNavigate();
  const [projectThreads, setProjectThreads] = useState<Array<ThreadObject>>();

  useEffect(() => {
    (async () => {
      if (/\/project/i.test(location.pathname)) {
        const threads = await clientSupport.query<
          GetProjectThreadsQuery,
          GetProjectThreadsQueryVariables
        >({
          query: GET_PROJECT_THREADS,
          variables: {
            projectId: location.pathname.split('/')[2]!,
          },
          fetchPolicy: 'network-only',
        });
        setProjectThreads(threads?.data?.getProjectThreads!);
      }
    })();

    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <Wrapper color={role || 'client'}>
      <Box className='overlay' onClick={onClose}></Box>
      <Box padding='25px 20px'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          marginBottom='20px'
        >
          <Box flexGrow='1'>
            <Text variant='title' weight='bold' color='white'>
              Messaging Support
            </Text>
          </Box>
          <Button
            variant='secondary-action'
            color={role || 'client'}
            text='Add'
            iconLeft={<Add />}
            onClick={() => {
              onClose();
              navigate(`/support-messaging/${location.pathname.split('/')[2]}`);
            }}
          />
        </Box>
        {projectThreads && projectThreads.length > 0 ? (
          <Box
            display='grid'
            gridTemplateColumns='1fr'
            rowGap='10px'
            alignItems='center'
          >
            {projectThreads.map((thread) => (
              <Box
                key={thread.id}
                padding='10px 15px'
                background='white'
                cursor='pointer'
                borderRadius='10px'
                onClick={() => {
                  onClose();
                  navigate(
                    `/support-messaging/${location.pathname.split('/')[2]}/${
                      thread.id
                    }`
                  );
                }}
              >
                <Text variant='body'>{thread.title}</Text>
              </Box>
            ))}
          </Box>
        ) : (
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
        )}
      </Box>
    </Wrapper>
  );
};

export default MessagingSidebar;
