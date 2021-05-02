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

export type CategoryResponseModel = {
  __typename?: 'CategoryResponseModel';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  image: File;
};

export type CountryPrefixModel = {
  __typename?: 'CountryPrefixModel';
  country: Scalars['String'];
  prefix: Scalars['String'];
};

export type FeatureResponseModel = {
  __typename?: 'FeatureResponseModel';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  featureType: Scalars['String'];
  image: File;
  wireframes?: Maybe<Array<FileWithOutOId>>;
  price: Scalars['Float'];
  repo: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  name: Scalars['String'];
  src: Scalars['String'];
};

export type FileWithOutOId = {
  __typename?: 'FileWithOutOId';
  id: Scalars['String'];
  name: Scalars['String'];
  src: Scalars['String'];
};

export type Introduction = {
  __typename?: 'Introduction';
  purpose: Scalars['String'];
  documentConventions: Scalars['String'];
  intendedAudience: Scalars['String'];
  projectScope: Scalars['String'];
};

export type IntroductionInput = {
  purpose: Scalars['String'];
  documentConventions: Scalars['String'];
  intendedAudience: Scalars['String'];
  projectScope: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  signup: AuthResponseModel;
  createUser: UserResponseModel;
  login: AuthResponseModel;
  deleteUser: UserResponseModel;
  updateUserInfo: UserResponseModel;
  updateUserPassword: UserResponseModel;
  resetUserPassword: UserResponseModel;
  confirmUserResetPassword: UserResponseModel;
  deleteCategory: CategoryResponseModel;
  deleteFeature: FeatureResponseModel;
  deleteTemplate: TemplateModel;
  updateTemplateFeature: TemplateResponseModel;
  addTemplateSpecification: TemplateResponseModel;
};


export type MutationRootSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRootCreateUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInputModel;
  address: AddressInputModel;
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
  firstName: Scalars['String'];
  lastName: Scalars['String'];
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


export type MutationRootDeleteCategoryArgs = {
  id: Scalars['String'];
};


export type MutationRootDeleteFeatureArgs = {
  id: Scalars['String'];
};


export type MutationRootDeleteTemplateArgs = {
  id: Scalars['String'];
};


export type MutationRootUpdateTemplateFeatureArgs = {
  id: Scalars['String'];
  featuresId: Array<Scalars['String']>;
};


export type MutationRootAddTemplateSpecificationArgs = {
  id: Scalars['String'];
  specification: SpecificationInput;
};

export type NonFunctionalRequirements = {
  __typename?: 'NonFunctionalRequirements';
  performanceRequirements: Scalars['String'];
  safetyRequirements: Scalars['String'];
  securityRequirements: Scalars['String'];
  softwareQualityAttributes: Scalars['String'];
};

export type NonFunctionalRequirementsInput = {
  performanceRequirements: Scalars['String'];
  safetyRequirements: Scalars['String'];
  securityRequirements: Scalars['String'];
  softwareQualityAttributes: Scalars['String'];
};

export type OverallDescription = {
  __typename?: 'OverallDescription';
  perspective: Scalars['String'];
  userCharacteristics: Scalars['String'];
  operatingEnvironment: Scalars['String'];
  designImplementationConstraints: Scalars['String'];
  userDocumentation: Scalars['String'];
  assemptionsDependencies: Scalars['String'];
};

export type OverallDescriptionInput = {
  perspective: Scalars['String'];
  userCharacteristics: Scalars['String'];
  operatingEnvironment: Scalars['String'];
  designImplementationConstraints: Scalars['String'];
  userDocumentation: Scalars['String'];
  assemptionsDependencies: Scalars['String'];
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
  getCategoryById: CategoryResponseModel;
  getFeatureById: FeatureResponseModel;
  getTemplateById: TemplateResponseModel;
  getAllCategories: Array<CategoryResponseModel>;
  getAllFeatures: Array<FeatureResponseModel>;
  getAllTemplates: Array<TemplateResponseModel>;
  getCountryCode: Array<CountryPrefixModel>;
};


export type QueryRootGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryRootGetCategoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryRootGetFeatureByIdArgs = {
  id: Scalars['String'];
};


export type QueryRootGetTemplateByIdArgs = {
  id: Scalars['String'];
};

export type Role =
  | 'Admin'
  | 'Client'
  | 'ProductOwner'
  | 'Developer';

export type Specification = {
  __typename?: 'Specification';
  introduction: Introduction;
  overallDescription: OverallDescription;
  nonFunctionalRequirements: NonFunctionalRequirements;
  otherRequirements: Scalars['String'];
  glossary: Scalars['String'];
  analysisModels: Scalars['String'];
  issuesList: Scalars['String'];
};

export type SpecificationInput = {
  introduction: IntroductionInput;
  overallDescription: OverallDescriptionInput;
  nonFunctionalRequirements: NonFunctionalRequirementsInput;
  otherRequirements: Scalars['String'];
  glossary: Scalars['String'];
  analysisModels: Scalars['String'];
  issuesList: Scalars['String'];
};

export type TemplateModel = {
  __typename?: 'TemplateModel';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<Scalars['String']>>;
  image: File;
  specification?: Maybe<Specification>;
};

export type TemplateResponseModel = {
  __typename?: 'TemplateResponseModel';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<FeatureResponseModel>>;
  image: File;
  specification?: Maybe<Specification>;
};

export type UserResponseModel = {
  __typename?: 'UserResponseModel';
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneModel;
  address: AddressModel;
  role: Scalars['String'];
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = (
  { __typename?: 'MutationRoot' }
  & { signup: (
    { __typename?: 'AuthResponseModel' }
    & Pick<AuthResponseModel, 'token'>
    & { user: (
      { __typename?: 'UserResponseModel' }
      & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
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
      & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
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
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
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
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type UpdateUserInfoMutationVariables = Exact<{
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInputModel;
  address: AddressInputModel;
}>;


export type UpdateUserInfoMutation = (
  { __typename?: 'MutationRoot' }
  & { updateUserInfo: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type UpdateUserPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: PasswordInputModel;
}>;


export type UpdateUserPasswordMutation = (
  { __typename?: 'MutationRoot' }
  & { updateUserPassword: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'MutationRoot' }
  & { deleteUser: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'QueryRoot' }
  & { getUserById: (
    { __typename?: 'UserResponseModel' }
    & Pick<UserResponseModel, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>
    & { phone: (
      { __typename?: 'PhoneModel' }
      & Pick<PhoneModel, 'prefix' | 'number'>
    ), address: (
      { __typename?: 'AddressModel' }
      & Pick<AddressModel, 'place' | 'city' | 'country' | 'zip'>
    ) }
  ) }
);

export type GetCountryCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountryCodesQuery = (
  { __typename?: 'QueryRoot' }
  & { getCountryCode: Array<(
    { __typename?: 'CountryPrefixModel' }
    & Pick<CountryPrefixModel, 'prefix' | 'country'>
  )> }
);
