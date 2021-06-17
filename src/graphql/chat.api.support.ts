import gql from 'graphql-tag';

export const GET_PROJECT_THREADS = gql`
  query GetProjectThreads($projectId: String!) {
    getProjectThreads(projectId: $projectId) {
      id
      title
      threadDescription
      userMessages {
        id
        username
        text
        attachment {
          name
          src
        }
      }
    }
  }
`;

export const GET_THREAD_BY_ID = gql`
  query GetThreadById($threadId: String!) {
    getThreadById(threadId: $threadId) {
      id
      title
      threadDescription
      userMessages {
        id
        username
        text
        attachment {
          name
          src
        }
      }
    }
  }
`;

export const MESSAGES = gql`
  query Messages($threadId: String!) {
    messages(threadId: $threadId) {
      id
      username
      text
      attachment {
        name
        src
      }
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
    )
  }
`;

export const SEND_MSG = gql`
  mutation SendMsg(
    $threadId: String!
    $username: String!
    $msg: String
    $file: FileInput
  ) {
    sendMsg(threadId: $threadId, username: $username, msg: $msg, file: $file)
  }
`;

export const CONNECT_STREAM = gql`
  subscription ConnectStream($mutationType: MutationType) {
    connectStream(mutationType: $mutationType) {
      mutationType
      id
      userMessage {
        id
        username
        text
        attachment {
          name
          src
        }
      }
    }
  }
`;
