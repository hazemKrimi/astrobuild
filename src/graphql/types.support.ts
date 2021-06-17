export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type FileInput = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type FileOutput = {
  __typename?: 'FileOutput';
  name: Scalars['String'];
  src: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createThread: Scalars['ID'];
  deleteThread: ThreadObject;
  sendMsg: Scalars['ID'];
};


export type MutationRootCreateThreadArgs = {
  projectId: Scalars['String'];
  title: Scalars['String'];
  threadDescription: Scalars['String'];
};


export type MutationRootDeleteThreadArgs = {
  threadId: Scalars['String'];
};


export type MutationRootSendMsgArgs = {
  threadId: Scalars['String'];
  username: Scalars['String'];
  msg?: Maybe<Scalars['String']>;
  file?: Maybe<FileInput>;
};

export type MutationType =
  | 'CREATED';

export type QueryRoot = {
  __typename?: 'QueryRoot';
  messages: Array<UserMessageObject>;
  getProjectThreads: Array<ThreadObject>;
  getThreadById: ThreadObject;
};


export type QueryRootMessagesArgs = {
  threadId: Scalars['String'];
};


export type QueryRootGetProjectThreadsArgs = {
  projectId: Scalars['String'];
};


export type QueryRootGetThreadByIdArgs = {
  threadId: Scalars['String'];
};

export type StreamChanged = {
  __typename?: 'StreamChanged';
  mutationType: MutationType;
  id: Scalars['ID'];
  userMessage?: Maybe<UserMessageObject>;
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  connectStream: StreamChanged;
};


export type SubscriptionRootConnectStreamArgs = {
  mutationType?: Maybe<MutationType>;
};

export type ThreadObject = {
  __typename?: 'ThreadObject';
  id: Scalars['String'];
  title: Scalars['String'];
  threadDescription: Scalars['String'];
  userMessages: Array<UserMessageObject>;
};

export type UserMessageObject = {
  __typename?: 'UserMessageObject';
  id: Scalars['String'];
  username: Scalars['String'];
  text: Scalars['String'];
  attachment: FileOutput;
};

export type GetProjectThreadsQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetProjectThreadsQuery = (
  { __typename?: 'QueryRoot' }
  & { getProjectThreads: Array<(
    { __typename?: 'ThreadObject' }
    & Pick<ThreadObject, 'id' | 'title' | 'threadDescription'>
    & { userMessages: Array<(
      { __typename?: 'UserMessageObject' }
      & Pick<UserMessageObject, 'id' | 'username' | 'text'>
      & { attachment: (
        { __typename?: 'FileOutput' }
        & Pick<FileOutput, 'name' | 'src'>
      ) }
    )> }
  )> }
);

export type GetThreadByIdQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type GetThreadByIdQuery = (
  { __typename?: 'QueryRoot' }
  & { getThreadById: (
    { __typename?: 'ThreadObject' }
    & Pick<ThreadObject, 'id' | 'title' | 'threadDescription'>
    & { userMessages: Array<(
      { __typename?: 'UserMessageObject' }
      & Pick<UserMessageObject, 'id' | 'username' | 'text'>
      & { attachment: (
        { __typename?: 'FileOutput' }
        & Pick<FileOutput, 'name' | 'src'>
      ) }
    )> }
  ) }
);

export type MessagesQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;


export type MessagesQuery = (
  { __typename?: 'QueryRoot' }
  & { messages: Array<(
    { __typename?: 'UserMessageObject' }
    & Pick<UserMessageObject, 'id' | 'username' | 'text'>
    & { attachment: (
      { __typename?: 'FileOutput' }
      & Pick<FileOutput, 'name' | 'src'>
    ) }
  )> }
);

export type CreateThreadMutationVariables = Exact<{
  projectId: Scalars['String'];
  title: Scalars['String'];
  threadDescription: Scalars['String'];
}>;


export type CreateThreadMutation = (
  { __typename?: 'MutationRoot' }
  & Pick<MutationRoot, 'createThread'>
);

export type SendMsgMutationVariables = Exact<{
  threadId: Scalars['String'];
  username: Scalars['String'];
  msg?: Maybe<Scalars['String']>;
  file?: Maybe<FileInput>;
}>;


export type SendMsgMutation = (
  { __typename?: 'MutationRoot' }
  & Pick<MutationRoot, 'sendMsg'>
);

export type ConnectStreamSubscriptionVariables = Exact<{
  mutationType?: Maybe<MutationType>;
}>;


export type ConnectStreamSubscription = (
  { __typename?: 'SubscriptionRoot' }
  & { connectStream: (
    { __typename?: 'StreamChanged' }
    & Pick<StreamChanged, 'mutationType' | 'id'>
    & { userMessage?: Maybe<(
      { __typename?: 'UserMessageObject' }
      & Pick<UserMessageObject, 'id' | 'username' | 'text'>
      & { attachment: (
        { __typename?: 'FileOutput' }
        & Pick<FileOutput, 'name' | 'src'>
      ) }
    )> }
  ) }
);
