/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  createThread: Support;
  deleteThread?: Maybe<Support>;
  sendMessage: Scalars['ID'];
};

export type MutationRootCreateThreadArgs = {
  projectId: Scalars['String'];
  threadDescription: Scalars['String'];
  title: Scalars['String'];
};

export type MutationRootDeleteThreadArgs = {
  threadId: Scalars['String'];
};

export type MutationRootSendMessageArgs = {
  text: Scalars['String'];
  threadId: Scalars['String'];
  username: Scalars['String'];
};

export enum MutationType {
  Created = 'CREATED',
}

export type QueryRoot = {
  __typename?: 'QueryRoot';
  messages?: Maybe<Array<UserMessages>>;
  thread?: Maybe<Support>;
  threads?: Maybe<Array<Support>>;
};

export type QueryRootMessagesArgs = {
  threadId: Scalars['ID'];
};

export type QueryRootThreadArgs = {
  threadId: Scalars['ID'];
};

export type QueryRootThreadsArgs = {
  projectId: Scalars['ID'];
};

export type StreamChanged = {
  __typename?: 'StreamChanged';
  id: Scalars['ID'];
  mutationType: MutationType;
  userMessages?: Maybe<UserMessages>;
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  interval: Scalars['Int'];
  messages: StreamChanged;
};

export type SubscriptionRootIntervalArgs = {
  n?: Scalars['Int'];
};

export type Support = {
  __typename?: 'Support';
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  threadDescription: Scalars['String'];
  title: Scalars['String'];
  userMessages: Array<UserMessages>;
};

export type UserMessages = {
  __typename?: 'UserMessages';
  id: Scalars['String'];
  username: Scalars['String'];
  text: Scalars['String'];
};

export type GetProjectThreadsQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;

export type GetProjectThreadsQuery = { __typename?: 'QueryRoot' } & {
  threads: Array<
    { __typename?: 'Support' } & Pick<
      Support,
      'id' | 'title' | 'projectId' | 'threadDescription' | 'userMessages'
    > & {
        userMessages: Array<
          { __typename?: 'UserMessage' } & Pick<
            UserMessages,
            'id' | 'username' | 'text'
          >
        >;
      }
  >;
};

export type GetThreadByIdQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;

export type GetThreadByIdQuery = { __typename?: 'QueryRoot' } & {
  thread: { __typename?: 'Support' } & Pick<
  Support,
    'id' | 'title' | 'projectId' | 'threadDescription' | 'userMessages'
  > & {
      userMessages: Array<
        { __typename?: 'UserMessages' } & Pick<UserMessages, 'id' | 'username' | 'text'>
      >;
    };
};

export type MessagesQueryVariables = Exact<{
  threadId: Scalars['String'];
}>;

export type MessagesQuery = { __typename?: 'QueryRoot' } & {
  messages: Array<
    { __typename?: 'UserMessages' } & Pick<UserMessages, 'username' | 'text' | 'id'>
  >;
};

export type CreateThreadMutationVariables = Exact<{
  projectId: Scalars['String'];
  title: Scalars['String'];
  threadDescription: Scalars['String'];
}>;

export type CreateThreadMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'createThread'
>;

export type SendMsgMutationVariables = Exact<{
  threadId: Scalars['String'];
  username: Scalars['String'];
  text: Scalars['String'];
}>;

export type SendMsgMutation = { __typename?: 'MutationRoot' } & Pick<
  MutationRoot,
  'sendMessage'
>;

export type MessagesSubscription = { __typename?: 'SubscriptionRoot' } & {
  messages: { __typename?: 'StreamChanged' } & Pick<
    StreamChanged,
    'mutationType'
  > & {
      userMessages?: Maybe<
        { __typename?: 'UserMessages' } & Pick<
          UserMessages,
          'id' | 'username' | 'text'
        >
>;
    };
};
