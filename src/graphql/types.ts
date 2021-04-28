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


export type AddressInputModel = {
  place: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
};

export type AddressModel = {
  __typename?: 'AddressModel';
  place: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
};

export type AuthResponseModel = {
  __typename?: 'AuthResponseModel';
  user: UserResponseModel;
  token: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  signup: AuthResponseModel;
  login: AuthResponseModel;
  deleteUser: UserResponseModel;
  updateUserInfo: UserResponseModel;
  updateUserPassword: UserResponseModel;
  resetUserPassword: UserResponseModel;
  confirmUserResetPassword: UserResponseModel;
};


export type MutationRootSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInputModel;
  address: AddressInputModel;
  active: Scalars['Boolean'];
  role: Role;
};


export type MutationRootLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRootDeleteUserArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRootUpdateUserInfoArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
  phone: PhoneInputModel;
  address: AddressInputModel;
};


export type MutationRootUpdateUserPasswordArgs = {
  id: Scalars['String'];
  password: PasswordInputModel;
};


export type MutationRootResetUserPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRootConfirmUserResetPasswordArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
};

export type PasswordInputModel = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type PhoneInputModel = {
  prefix: Scalars['String'];
  number: Scalars['String'];
};

export type PhoneModel = {
  __typename?: 'PhoneModel';
  prefix: Scalars['String'];
  number: Scalars['String'];
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  getAllUsers: Array<UserResponseModel>;
  getUserById: UserResponseModel;
};


export type QueryRootGetUserByIdArgs = {
  id: Scalars['String'];
};

export type Role =
  | 'Admin'
  | 'Client'
  | 'ProductOwner'
  | 'Developer';

export type UserResponseModel = {
  __typename?: 'UserResponseModel';
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneModel;
  address: AddressModel;
  active: Scalars['Boolean'];
  role: Scalars['String'];
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInputModel;
  address: AddressInputModel;
  active: Scalars['Boolean'];
  role: Role;
}>;


export type SignupMutation = (
  { __typename?: 'MutationRoot' }
  & { signup: (
    { __typename?: 'AuthResponseModel' }
    & Pick<AuthResponseModel, 'token'>
    & { user: (
      { __typename?: 'UserResponseModel' }
      & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'active' | 'role'>
      & { phone: (
        { __typename?: 'PhoneModel' }
        & Pick<PhoneModel, 'prefix' | 'number'>
      ), address: (
        { __typename?: 'AddressModel' }
        & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
      ) }
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'MutationRoot' }
  & { login: (
    { __typename?: 'AuthResponseModel' }
    & Pick<AuthResponseModel, 'token'>
    & { user: (
      { __typename?: 'UserResponseModel' }
      & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'active' | 'role'>
      & { phone: (
        { __typename?: 'PhoneModel' }
        & Pick<PhoneModel, 'prefix' | 'number'>
      ), address: (
        { __typename?: 'AddressModel' }
        & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
      ) }
    ) }
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'MutationRoot' }
  & { resetUserPassword: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'active' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type ConfirmUserResetPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type ConfirmUserResetPasswordMutation = (
  { __typename?: 'MutationRoot' }
  & { confirmUserResetPassword: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'active' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);
