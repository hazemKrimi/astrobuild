import gql from 'graphql-tag';

export const GET_PROJECT_THREADS = gql`
  query GetProjectThreads($projectId: String!) {
    threads(projectId: $projectId) {
      id
      title
      threadDescription
      userMessages {
        id
        username
        text
      }
    }
  }
`;

export const GET_THREAD_BY_ID = gql`
  query GetThreadById($threadId: String!) {
    thread(threadId: $threadId) {
      id
      title
      threadDescription
      userMessages {
        id
        username
        text
      }
    }
  }
`;

export const MESSAGES = gql`
  query Messages($threadId: String!) {
    messages(threadId: $threadId) {
      username
      text
    }
  }
`;

export const CREATE_THREAD = gql`
  mutation CreateThread(
    $projectId: String!
    $title: String!
    $threadDescription: String!
  ) {
    createThread(
      projectId: $projectId
      title: $title
      threadDescription: $threadDescription
    ) {
      id
    }
  }
`;

export const SEND_MSG = gql`
  mutation SendMessage($threadId: String!, $username: String!, $text: String!) {
    sendMessage(threadId: $threadId, username: $username, text: $text)
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription messagesSubscription {
    messages {
      mutationType
      id
      userMessages {
        id
        username
        text
      }
    }
  }
`;
