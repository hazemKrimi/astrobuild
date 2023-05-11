import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { useState, useEffect } from 'react';
import { roleVar, userVar } from '../../graphql/state';
import { Wrapper } from './styles';
import {
  ConnectStreamSubscription,
  ConnectStreamSubscriptionVariables,
  CreateThreadMutation,
  CreateThreadMutationVariables,
  GetThreadByIdQuery,
  GetThreadByIdQueryVariables,
  MessagesQuery,
  MessagesQueryVariables,
  SendMsgMutation,
  SendMsgMutationVariables,
  ThreadObject,
  UserMessageObject,
} from '../../graphql/types.support';
import { Box, Button, Input, TextArea, Text } from '../../components';
import { Send, ThreadClient, ThreadProductOwner } from '../../assets';
import {
  CONNECT_STREAM,
  CREATE_THREAD,
  GET_THREAD_BY_ID,
  MESSAGES,
  SEND_MSG,
} from '../../graphql/chat.api.support';
import { theme } from '../../themes';
import { clientSupport } from '../..';

const Support = () => {
  const { project, id } = useParams<{ id: string; project: string }>();
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);
  const navigate = useNavigate();
  const [thread, setThread] = useState<ThreadObject>();
  const [messages, setMessages] = useState<Array<UserMessageObject>>([]);
  const [addedMessages, setAddedMessages] = useState<Array<UserMessageObject>>(
    []
  );

  useEffect(() => {
    (async () => {
      if (id) {
        const threadResult = await clientSupport.query<
          GetThreadByIdQuery,
          GetThreadByIdQueryVariables
        >({
          query: GET_THREAD_BY_ID,
          variables: {
            threadId: id!,
          },
        });

        setThread(threadResult?.data?.getThreadById);

        const messagesResult = await clientSupport.query<
          MessagesQuery,
          MessagesQueryVariables
        >({
          query: MESSAGES,
          variables: {
            threadId: id!,
          },
          fetchPolicy: 'network-only',
        });
        setMessages(
          Array.from(messagesResult?.data?.messages).map((message, index) => ({
            text: message.text,
            username: message.username,
            id: index.toString(),
          }))
        );

        const messageSubscriber = clientSupport.subscribe<
          ConnectStreamSubscription,
          ConnectStreamSubscriptionVariables
        >({
          query: CONNECT_STREAM,
          variables: {
            mutationType: 'CREATED',
          },
        });

        messageSubscriber.subscribe(({ data }) => {
          setAddedMessages((prevMessages) => [
            ...prevMessages,
            {
              id: messages.length.toString(),
              username: data?.connectStream?.userMessage?.username!,
              text: data?.connectStream?.userMessage?.text!,
            },
          ]);
        });
      }
    })();
  }, [id]);

  const createThreadForm = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async ({ title, description }) => {
      const createdThread = await clientSupport.mutate<
        CreateThreadMutation,
        CreateThreadMutationVariables
      >({
        mutation: CREATE_THREAD,
        variables: {
          projectId: project as string,
          title,
          threadDescription: description,
        },
      });
      navigate(
        `/support/${project}/${createdThread.data?.createThread}`
      );
    },
  });

  const sendMsgForm = useFormik({
    initialValues: {
      msg: '',
    },
    validationSchema: Yup.object().shape({
      msg: Yup.string().required('Message is required'),
    }),
    onSubmit: async ({ msg }, { resetForm }) => {
      await clientSupport.mutate<SendMsgMutation, SendMsgMutationVariables>({
        mutation: SEND_MSG,
        variables: {
          threadId: id as string,
          username: `${currentUser?.firstName} ${currentUser?.lastName}`,
          msg,
        },
      });
      resetForm();
    },
  });

  return (
    <Wrapper>
      <Box padding='35px 45px 30px 120px'>
        {!thread ? (
          <>
            <Box
              background='#F9FAFA'
              boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
              borderRadius='10px'
              padding='50px'
              width='100%'
              display='flex'
              alignItems='center'
              justifyContent='center'
              marginBottom='20px'
            >
              {role === 'client' ? <ThreadClient /> : <ThreadProductOwner />}
            </Box>
            <form onSubmit={createThreadForm.handleSubmit}>
              <Box
                background='#F9FAFA'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                borderRadius='10px'
                padding='15px'
                display='grid'
                gridTemplateColumns='auto'
                alignItems='center'
                rowGap='15px'
              >
                <Input
                  name='title'
                  placeholder='Title'
                  color={role || 'client'}
                  value={createThreadForm.values.title}
                  onChange={createThreadForm.handleChange}
                  onBlur={createThreadForm.handleBlur}
                  error={
                    createThreadForm.touched.title &&
                    !!createThreadForm.errors.title
                  }
                  errorMessage={createThreadForm.errors.title}
                />
                <TextArea
                  name='description'
                  placeholder='Description'
                  color={role || 'client'}
                  value={createThreadForm.values.description}
                  onChange={createThreadForm.handleChange}
                  onBlur={createThreadForm.handleBlur}
                  error={
                    createThreadForm.touched.description &&
                    !!createThreadForm.errors.description
                  }
                  errorMessage={createThreadForm.errors.description}
                />
                <Button
                  text='Send'
                  type='submit'
                  color={role || 'client'}
                  variant='primary-action'
                  iconLeft={<Send />}
                />
              </Box>
            </form>
          </>
        ) : (
          <>
            <Box
              background='white'
              boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
              borderRadius='10px'
              padding='15px'
              marginBottom='20px'
            >
              <Box marginBottom='10px'>
                <Text variant='title' weight='bold' gutterBottom>
                  {thread.title}
                </Text>
              </Box>
              <Text variant='body'>{thread.threadDescription}</Text>
            </Box>
            <Box
              background='#F9FAFA'
              boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
              borderRadius='10px'
              padding='15px'
              display='flex'
              flexDirection='column'
              marginBottom='20px'
            >
              {messages.map((msg) => (
                <Box
                  borderRadius='10px'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  marginBottom='15px'
                  padding='10px'
                  color={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? 'white'
                      : 'initial'
                  }
                  key={msg.id}
                  background={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? theme.colors[role || 'client'].main
                      : 'white'
                  }
                  alignSelf={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? 'flex-end'
                      : 'flex-start'
                  }
                >
                  <Box marginBottom='5px'>
                    <Text variant='body'>{msg.text}</Text>
                  </Box>
                </Box>
              ))}
              {addedMessages.map((msg) => (
                <Box
                  borderRadius='10px'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  marginBottom='15px'
                  padding='10px'
                  color={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? 'white'
                      : 'initial'
                  }
                  key={msg.id}
                  background={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? theme.colors[role || 'client'].main
                      : 'white'
                  }
                  alignSelf={
                    msg.username ===
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                      ? 'flex-end'
                      : 'flex-start'
                  }
                >
                  <Box marginBottom='5px'>
                    <Text variant='body'>{msg.text}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
            <form onSubmit={sendMsgForm.handleSubmit}>
              <Box
                background='#F9FAFA'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                borderRadius='10px'
                padding='15px'
                display='grid'
                gridTemplateColumns='auto'
                alignItems='center'
                rowGap='15px'
              >
                <TextArea
                  name='msg'
                  placeholder='Message'
                  color={role || 'client'}
                  value={sendMsgForm.values.msg}
                  onChange={sendMsgForm.handleChange}
                  onBlur={sendMsgForm.handleBlur}
                  error={sendMsgForm.touched.msg && !!sendMsgForm.errors.msg}
                  errorMessage={sendMsgForm.errors.msg}
                />
                <Button
                  text='Send'
                  type='submit'
                  color={role || 'client'}
                  variant='primary-action'
                  iconLeft={<Send />}
                />
              </Box>
            </form>
          </>
        )}
      </Box>
    </Wrapper>
  );
};

export default Support;
