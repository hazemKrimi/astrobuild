export type Maybe<T> = T | null;
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

export type AddressInput = {
  place: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
};

export type AddressOutput = {
  __typename?: 'AddressOutput';
  place: Scalars['String'];
  city: Scalars['String'];
  zip: Scalars['String'];
  country: Scalars['String'];
};

export type CategoryInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  image: InputFile;
};

export type CategoryOutput = {
  __typename?: 'CategoryOutput';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  image: File;
};

export type ConnectionsInput = {
  to: Scalars['String'];
  releations: RelationsInput;
};

export type ConnectionsOutput = {
  __typename?: 'ConnectionsOutput';
  to: Scalars['String'];
  releations: RelationsOutput;
};

export type CountryPrefixModel = {
  __typename?: 'CountryPrefixModel';
  country: Scalars['String'];
  prefix: Scalars['String'];
};

export type DelivrableInput = {
  specification: Scalars['Boolean'];
  fullBuild: Scalars['Boolean'];
  mvp: Scalars['Boolean'];
  design: Scalars['Boolean'];
};

export type DelivrableOutput = {
  __typename?: 'DelivrableOutput';
  specification: File;
  fullBuild: Scalars['String'];
  mvp: File;
  design: File;
};

export type DevtimeInput = {
  months: Scalars['Int'];
  days: Scalars['Int'];
  hours: Scalars['Int'];
};

export type DevtimeOutput = {
  __typename?: 'DevtimeOutput';
  months: Scalars['Int'];
  days: Scalars['Int'];
  hours: Scalars['Int'];
};

export type FeatureInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  featureType: Scalars['String'];
  image: InputFile;
  wireframes?: Maybe<Array<InputFile>>;
  price: Scalars['Float'];
  repo: Scalars['String'];
};

export type FeatureOutput = {
  __typename?: 'FeatureOutput';
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

export type InputFile = {
  name: Scalars['String'];
  src: Scalars['String'];
};

export type IntroductionInput = {
  purpose: Scalars['String'];
  documentConventions: Scalars['String'];
  intendedAudience: Scalars['String'];
  projectScope: Scalars['String'];
};

export type IntroductionOutput = {
  __typename?: 'IntroductionOutput';
  purpose: Scalars['String'];
  documentConventions: Scalars['String'];
  intendedAudience: Scalars['String'];
  projectScope: Scalars['String'];
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  signup: UserAuthenticationOutput;
  createUser: UserOutput;
  login: UserAuthenticationOutput;
  deleteUser: UserOutput;
  updateUserInfo: UserOutput;
  updateUserPassword: UserOutput;
  resetUserPassword: UserOutput;
  confirmUserResetPassword: UserOutput;
  deleteCategory: CategoryOutput;
  deleteFeature: FeatureOutput;
  deleteTemplate: TemplateDefactoredOutput;
  updateTemplateFeatures: TemplateOutput;
  addTemplateSpecification: TemplateOutput;
  addCategory: CategoryOutput;
  updateCategory: CategoryOutput;
  addFeature: FeatureOutput;
  updateFeature: FeatureOutput;
  deleteFeatureWireframe: FeatureOutput;
  addFeatureWireframes: FeatureOutput;
  addTemplate: TemplateOutput;
  updateTemplate: TemplateOutput;
  addPrototype: TemplateProtoTypeOutput;
  updatePrototype: TemplateProtoTypeOutput;
  addProject: ProjectOutput;
  changeProjectState: ProjectOutput;
  updateProject: ProjectOutput;
  addProjectProposal: ProjectOutput;
  addProjectMvp: ProjectOutput;
  addProjectFullBuild: ProjectOutput;
  addProjectDesign: ProjectOutput;
};

export type MutationRootSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRootCreateUserArgs = {
  user: UserInput;
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
  user: UpdateUserInput;
};

export type MutationRootUpdateUserPasswordArgs = {
  id: Scalars['String'];
  password: PasswordInput;
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

export type MutationRootUpdateTemplateFeaturesArgs = {
  id: Scalars['String'];
  featuresId: Array<Scalars['String']>;
};

export type MutationRootAddTemplateSpecificationArgs = {
  id: Scalars['String'];
  specification: SpecificationInput;
};

export type MutationRootAddCategoryArgs = {
  category: CategoryInput;
};

export type MutationRootUpdateCategoryArgs = {
  id: Scalars['String'];
  category: CategoryInput;
};

export type MutationRootAddFeatureArgs = {
  feature: FeatureInput;
};

export type MutationRootUpdateFeatureArgs = {
  id: Scalars['String'];
  feature: FeatureInput;
};

export type MutationRootDeleteFeatureWireframeArgs = {
  id: Scalars['String'];
};

export type MutationRootAddFeatureWireframesArgs = {
  id: Scalars['String'];
  wireframes: Array<InputFile>;
};

export type MutationRootAddTemplateArgs = {
  template: TemplateInput;
};

export type MutationRootUpdateTemplateArgs = {
  id: Scalars['String'];
  template: TemplateUpdateInput;
  specification?: Maybe<SpecificationInput>;
};

export type MutationRootAddPrototypeArgs = {
  prototype: TemplateProtoTypeInput;
};

export type MutationRootUpdatePrototypeArgs = {
  prototype: TemplateProtoTypeInput;
};

export type MutationRootAddProjectArgs = {
  project: ProjectInput;
};

export type MutationRootChangeProjectStateArgs = {
  id: Scalars['String'];
  state: State;
};

export type MutationRootUpdateProjectArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
  image: InputFile;
};

export type MutationRootAddProjectProposalArgs = {
  id: Scalars['String'];
  proposal: ProposalInput;
};

export type MutationRootAddProjectMvpArgs = {
  mvp: ProjectFileInput;
};

export type MutationRootAddProjectFullBuildArgs = {
  fullBuild: ProjectFullBuildInput;
};

export type MutationRootAddProjectDesignArgs = {
  design: ProjectFileInput;
};

export type NonFunctionalRequirementsInput = {
  performanceRequirements: Scalars['String'];
  safetyRequirements: Scalars['String'];
  securityRequirements: Scalars['String'];
  softwareQualityAttributes: Scalars['String'];
};

export type NonFunctionalRequirementsOutput = {
  __typename?: 'NonFunctionalRequirementsOutput';
  performanceRequirements: Scalars['String'];
  safetyRequirements: Scalars['String'];
  securityRequirements: Scalars['String'];
  softwareQualityAttributes: Scalars['String'];
};

export type OverallDescriptionInput = {
  perspective: Scalars['String'];
  userCharacteristics: Scalars['String'];
  operatingEnvironment: Scalars['String'];
  designImplementationConstraints: Scalars['String'];
  userDocumentation: Scalars['String'];
  assemptionsDependencies: Scalars['String'];
};

export type OverallDescriptionOutput = {
  __typename?: 'OverallDescriptionOutput';
  perspective: Scalars['String'];
  userCharacteristics: Scalars['String'];
  operatingEnvironment: Scalars['String'];
  designImplementationConstraints: Scalars['String'];
  userDocumentation: Scalars['String'];
  assemptionsDependencies: Scalars['String'];
};

export type PasswordInput = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type PaymentOptionInput = {
  optOne: Scalars['Int'];
  optTwo: Scalars['Int'];
  optThree: Scalars['Int'];
};

export type PaymentOptionOutput = {
  __typename?: 'PaymentOptionOutput';
  optOne: Scalars['Int'];
  optTwo: Scalars['Int'];
  optThree: Scalars['Int'];
};

export type PhoneInput = {
  prefix: Scalars['String'];
  number: Scalars['String'];
};

export type PhoneOutput = {
  __typename?: 'PhoneOutput';
  prefix: Scalars['String'];
  number: Scalars['String'];
};

export type ProjectFileInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  src: Scalars['String'];
};

export type ProjectFullBuildInput = {
  id: Scalars['String'];
  url: Scalars['String'];
};

export type ProjectInput = {
  clientId: Scalars['String'];
  name: Scalars['String'];
  image: InputFile;
  platforms: Array<Scalars['String']>;
  template: Scalars['String'];
  features: Array<Scalars['String']>;
  paymentOption: PaymentOptionInput;
  delivrable?: Maybe<DelivrableInput>;
  totalPrice: Scalars['Float'];
};

export type ProjectOutput = {
  __typename?: 'ProjectOutput';
  id: Scalars['String'];
  clientId: Scalars['String'];
  name: Scalars['String'];
  image: File;
  platforms: Array<Scalars['String']>;
  template: TemplateOutput;
  features: Array<FeatureOutput>;
  state: Scalars['String'];
  proposal?: Maybe<ProposalOutput>;
  paymentOption: PaymentOptionOutput;
  delivrable?: Maybe<DelivrableOutput>;
  totalPrice: Scalars['Float'];
};

export type ProposalInput = {
  devtime: DevtimeInput;
  summary: Scalars['String'];
  purpose: Scalars['String'];
  resources: Array<ResourceInput>;
};

export type ProposalOutput = {
  __typename?: 'ProposalOutput';
  devtime: DevtimeOutput;
  summary: Scalars['String'];
  purpose: Scalars['String'];
  resources: Array<ResourceOutput>;
};

export type ProtoTypeInput = {
  featureId: Scalars['String'];
  connections: Array<ConnectionsInput>;
};

export type ProtoTypeOutput = {
  __typename?: 'ProtoTypeOutput';
  feature: FeatureOutput;
  connections: Array<ConnectionsOutput>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  getAllUsers: Array<UserOutput>;
  getUserById: UserOutput;
  getCategoryById: CategoryOutput;
  getFeatureById: FeatureOutput;
  getPrototypeById: TemplateProtoTypeOutput;
  getTemplateById: TemplateOutput;
  getProjectById: ProjectOutput;
  getAllProjectsByClientId: Array<ProjectOutput>;
  getAllProjects: Array<ProjectOutput>;
  getAllCategories: Array<CategoryOutput>;
  getAllFeatures: Array<FeatureOutput>;
  getAllTemplates: Array<TemplateOutput>;
  getAllTemplatesByCategoriesId: Array<TemplateOutput>;
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

export type QueryRootGetPrototypeByIdArgs = {
  id: Scalars['String'];
};

export type QueryRootGetTemplateByIdArgs = {
  id: Scalars['String'];
};

export type QueryRootGetProjectByIdArgs = {
  id: Scalars['String'];
};

export type QueryRootGetAllProjectsByClientIdArgs = {
  id: Scalars['String'];
};

export type QueryRootGetAllTemplatesByCategoriesIdArgs = {
  categories: Array<Scalars['String']>;
};

export type RelationsInput = {
  back: Scalars['Boolean'];
  forword: Scalars['Boolean'];
};

export type RelationsOutput = {
  __typename?: 'RelationsOutput';
  back: Scalars['Boolean'];
  forword: Scalars['Boolean'];
};

export type ResourceInput = {
  resourceType: Scalars['String'];
  developers: Scalars['Int'];
};

export type ResourceOutput = {
  __typename?: 'ResourceOutput';
  resourceType: Scalars['String'];
  developers: Scalars['Int'];
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

export type SpecificationOutput = {
  __typename?: 'SpecificationOutput';
  introduction: IntroductionOutput;
  overallDescription: OverallDescriptionOutput;
  nonFunctionalRequirements: NonFunctionalRequirementsOutput;
  otherRequirements: Scalars['String'];
  glossary: Scalars['String'];
  analysisModels: Scalars['String'];
  issuesList: Scalars['String'];
};

export type State = 'Approved' | 'Declined' | 'OnReview' | 'Archived';

export type TemplateDefactoredOutput = {
  __typename?: 'TemplateDefactoredOutput';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<Scalars['String']>>;
  image: File;
  specification?: Maybe<SpecificationOutput>;
};

export type TemplateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<Scalars['String']>>;
  image: InputFile;
  specification?: Maybe<SpecificationInput>;
};

export type TemplateOutput = {
  __typename?: 'TemplateOutput';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<FeatureOutput>>;
  image: File;
  specification?: Maybe<SpecificationOutput>;
};

export type TemplateProtoTypeInput = {
  templateId: Scalars['String'];
  prototype: Array<ProtoTypeInput>;
};

export type TemplateProtoTypeOutput = {
  __typename?: 'TemplateProtoTypeOutput';
  id: Scalars['String'];
  template: Scalars['String'];
  prototype: Array<ProtoTypeOutput>;
};

export type TemplateUpdateInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  category: Scalars['String'];
  features?: Maybe<Array<Scalars['String']>>;
  image: InputFile;
};

export type UpdateUserInput = {
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInput;
  address: AddressInput;
  role: Scalars['String'];
};

export type UserAuthenticationOutput = {
  __typename?: 'UserAuthenticationOutput';
  user: UserOutput;
  token: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneInput;
  address: AddressInput;
  role: Scalars['String'];
};

export type UserOutput = {
  __typename?: 'UserOutput';
  id: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: PhoneOutput;
  address: AddressOutput;
  role: Scalars['String'];
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = { __typename?: 'QueryRoot' } & {
  getAllUsers: Array<
    { __typename?: 'UserOutput' } & Pick<
      UserOutput,
      'id' | 'email' | 'firstName' | 'lastName' | 'role'
    > & {
        phone: { __typename?: 'PhoneOutput' } & Pick<
          PhoneOutput,
          'prefix' | 'number'
        >;
        address: { __typename?: 'AddressOutput' } & Pick<
          AddressOutput,
          'place' | 'city' | 'country' | 'zip'
        >;
      }
  >;
};

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetUserByIdQuery = { __typename?: 'QueryRoot' } & {
  getUserById: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type CreateUserMutationVariables = Exact<{
  user: UserInput;
}>;

export type CreateUserMutation = { __typename?: 'MutationRoot' } & {
  createUser: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignupMutation = { __typename?: 'MutationRoot' } & {
  signup: { __typename?: 'UserAuthenticationOutput' } & Pick<
    UserAuthenticationOutput,
    'token'
  > & {
      user: { __typename?: 'UserOutput' } & Pick<
        UserOutput,
        'id' | 'email' | 'firstName' | 'lastName' | 'role'
      > & {
          phone: { __typename?: 'PhoneOutput' } & Pick<
            PhoneOutput,
            'prefix' | 'number'
          >;
          address: { __typename?: 'AddressOutput' } & Pick<
            AddressOutput,
            'place' | 'city' | 'country' | 'zip'
          >;
        };
    };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'MutationRoot' } & {
  login: { __typename?: 'UserAuthenticationOutput' } & Pick<
    UserAuthenticationOutput,
    'token'
  > & {
      user: { __typename?: 'UserOutput' } & Pick<
        UserOutput,
        'id' | 'email' | 'firstName' | 'lastName' | 'role'
      > & {
          phone: { __typename?: 'PhoneOutput' } & Pick<
            PhoneOutput,
            'prefix' | 'number'
          >;
          address: { __typename?: 'AddressOutput' } & Pick<
            AddressOutput,
            'place' | 'city' | 'country' | 'zip'
          >;
        };
    };
};

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type ResetPasswordMutation = { __typename?: 'MutationRoot' } & {
  resetUserPassword: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type ConfirmUserResetPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;

export type ConfirmUserResetPasswordMutation = {
  __typename?: 'MutationRoot';
} & {
  confirmUserResetPassword: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type UpdateUserInfoMutationVariables = Exact<{
  user: UpdateUserInput;
}>;

export type UpdateUserInfoMutation = { __typename?: 'MutationRoot' } & {
  updateUserInfo: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type UpdateUserPasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: PasswordInput;
}>;

export type UpdateUserPasswordMutation = { __typename?: 'MutationRoot' } & {
  updateUserPassword: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
}>;

export type DeleteUserMutation = { __typename?: 'MutationRoot' } & {
  deleteUser: { __typename?: 'UserOutput' } & Pick<
    UserOutput,
    'id' | 'email' | 'firstName' | 'lastName' | 'role'
  > & {
      phone: { __typename?: 'PhoneOutput' } & Pick<
        PhoneOutput,
        'prefix' | 'number'
      >;
      address: { __typename?: 'AddressOutput' } & Pick<
        AddressOutput,
        'place' | 'city' | 'country' | 'zip'
      >;
    };
};

export type GetCountryCodesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCountryCodesQuery = { __typename?: 'QueryRoot' } & {
  getCountryCode: Array<
    { __typename?: 'CountryPrefixModel' } & Pick<
      CountryPrefixModel,
      'prefix' | 'country'
    >
  >;
};

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCategoriesQuery = { __typename?: 'QueryRoot' } & {
  getAllCategories: Array<
    { __typename?: 'CategoryOutput' } & Pick<
      CategoryOutput,
      'id' | 'name' | 'description'
    > & { image: { __typename?: 'File' } & Pick<File, 'name' | 'src'> }
  >;
};

export type GetCategoryByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetCategoryByIdQuery = { __typename?: 'QueryRoot' } & {
  getCategoryById: { __typename?: 'CategoryOutput' } & Pick<
    CategoryOutput,
    'id' | 'name' | 'description'
  > & { image: { __typename?: 'File' } & Pick<File, 'name' | 'src'> };
};

export type AddCategoryMutationVariables = Exact<{
  category: CategoryInput;
}>;

export type AddCategoryMutation = { __typename?: 'MutationRoot' } & {
  addCategory: { __typename?: 'CategoryOutput' } & Pick<
    CategoryOutput,
    'id' | 'name' | 'description'
  > & { image: { __typename?: 'File' } & Pick<File, 'name' | 'src'> };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String'];
  category: CategoryInput;
}>;

export type UpdateCategoryMutation = { __typename?: 'MutationRoot' } & {
  updateCategory: { __typename?: 'CategoryOutput' } & Pick<
    CategoryOutput,
    'id' | 'name' | 'description'
  > & { image: { __typename?: 'File' } & Pick<File, 'name' | 'src'> };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteCategoryMutation = { __typename?: 'MutationRoot' } & {
  deleteCategory: { __typename?: 'CategoryOutput' } & Pick<
    CategoryOutput,
    'id' | 'name' | 'description'
  > & { image: { __typename?: 'File' } & Pick<File, 'name' | 'src'> };
};

export type GetAllFeaturesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllFeaturesQuery = { __typename?: 'QueryRoot' } & {
  getAllFeatures: Array<
    { __typename?: 'FeatureOutput' } & Pick<
      FeatureOutput,
      'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
    > & {
        image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
        wireframes?: Maybe<
          Array<
            { __typename?: 'FileWithOutOId' } & Pick<
              FileWithOutOId,
              'id' | 'name' | 'src'
            >
          >
        >;
      }
  >;
};

export type GetFeatureByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetFeatureByIdQuery = { __typename?: 'QueryRoot' } & {
  getFeatureById: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type AddFeatureMutationVariables = Exact<{
  feature: FeatureInput;
}>;

export type AddFeatureMutation = { __typename?: 'MutationRoot' } & {
  addFeature: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type UpdateFeatureMutationVariables = Exact<{
  id: Scalars['String'];
  feature: FeatureInput;
}>;

export type UpdateFeatureMutation = { __typename?: 'MutationRoot' } & {
  updateFeature: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type DeleteFeatureMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteFeatureMutation = { __typename?: 'MutationRoot' } & {
  deleteFeature: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type AddFeatureWireframesMutationVariables = Exact<{
  id: Scalars['String'];
  wireframes: Array<InputFile> | InputFile;
}>;

export type AddFeatureWireframesMutation = { __typename?: 'MutationRoot' } & {
  addFeatureWireframes: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type DeleteFeatureWireframeMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteFeatureWireframeMutation = { __typename?: 'MutationRoot' } & {
  deleteFeatureWireframe: { __typename?: 'FeatureOutput' } & Pick<
    FeatureOutput,
    'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      wireframes?: Maybe<
        Array<
          { __typename?: 'FileWithOutOId' } & Pick<
            FileWithOutOId,
            'id' | 'name' | 'src'
          >
        >
      >;
    };
};

export type GetAllProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllProjectsQuery = { __typename?: 'QueryRoot' } & {
  getAllProjects: Array<
    { __typename?: 'ProjectOutput' } & Pick<
      ProjectOutput,
      'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
    > & {
        image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
        template: { __typename?: 'TemplateOutput' } & Pick<
          TemplateOutput,
          'id' | 'name' | 'description' | 'category'
        > & {
            features?: Maybe<
              Array<
                { __typename?: 'FeatureOutput' } & Pick<
                  FeatureOutput,
                  | 'id'
                  | 'name'
                  | 'description'
                  | 'featureType'
                  | 'price'
                  | 'repo'
                > & {
                    image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                    wireframes?: Maybe<
                      Array<
                        { __typename?: 'FileWithOutOId' } & Pick<
                          FileWithOutOId,
                          'id' | 'name' | 'src'
                        >
                      >
                    >;
                  }
              >
            >;
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            specification?: Maybe<
              { __typename?: 'SpecificationOutput' } & Pick<
                SpecificationOutput,
                | 'otherRequirements'
                | 'glossary'
                | 'analysisModels'
                | 'issuesList'
              > & {
                  introduction: { __typename?: 'IntroductionOutput' } & Pick<
                    IntroductionOutput,
                    | 'purpose'
                    | 'documentConventions'
                    | 'intendedAudience'
                    | 'projectScope'
                  >;
                  overallDescription: {
                    __typename?: 'OverallDescriptionOutput';
                  } & Pick<
                    OverallDescriptionOutput,
                    | 'perspective'
                    | 'userCharacteristics'
                    | 'operatingEnvironment'
                    | 'designImplementationConstraints'
                    | 'userDocumentation'
                    | 'assemptionsDependencies'
                  >;
                  nonFunctionalRequirements: {
                    __typename?: 'NonFunctionalRequirementsOutput';
                  } & Pick<
                    NonFunctionalRequirementsOutput,
                    | 'performanceRequirements'
                    | 'safetyRequirements'
                    | 'securityRequirements'
                    | 'softwareQualityAttributes'
                  >;
                }
            >;
          };
        features: Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >;
        proposal?: Maybe<
          { __typename?: 'ProposalOutput' } & Pick<
            ProposalOutput,
            'summary' | 'purpose'
          > & {
              devtime: { __typename?: 'DevtimeOutput' } & Pick<
                DevtimeOutput,
                'months' | 'days' | 'hours'
              >;
              resources: Array<
                { __typename?: 'ResourceOutput' } & Pick<
                  ResourceOutput,
                  'resourceType' | 'developers'
                >
              >;
            }
        >;
        paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
          PaymentOptionOutput,
          'optOne' | 'optTwo' | 'optThree'
        >;
        delivrable?: Maybe<
          { __typename?: 'DelivrableOutput' } & Pick<
            DelivrableOutput,
            'fullBuild'
          > & {
              specification: { __typename?: 'File' } & Pick<
                File,
                'name' | 'src'
              >;
              mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            }
        >;
      }
  >;
};

export type GetAllProjectsByClientIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetAllProjectsByClientIdQuery = { __typename?: 'QueryRoot' } & {
  getAllProjectsByClientId: Array<
    { __typename?: 'ProjectOutput' } & Pick<
      ProjectOutput,
      'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
    > & {
        image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
        template: { __typename?: 'TemplateOutput' } & Pick<
          TemplateOutput,
          'id' | 'name' | 'description' | 'category'
        > & {
            features?: Maybe<
              Array<
                { __typename?: 'FeatureOutput' } & Pick<
                  FeatureOutput,
                  | 'id'
                  | 'name'
                  | 'description'
                  | 'featureType'
                  | 'price'
                  | 'repo'
                > & {
                    image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                    wireframes?: Maybe<
                      Array<
                        { __typename?: 'FileWithOutOId' } & Pick<
                          FileWithOutOId,
                          'id' | 'name' | 'src'
                        >
                      >
                    >;
                  }
              >
            >;
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            specification?: Maybe<
              { __typename?: 'SpecificationOutput' } & Pick<
                SpecificationOutput,
                | 'otherRequirements'
                | 'glossary'
                | 'analysisModels'
                | 'issuesList'
              > & {
                  introduction: { __typename?: 'IntroductionOutput' } & Pick<
                    IntroductionOutput,
                    | 'purpose'
                    | 'documentConventions'
                    | 'intendedAudience'
                    | 'projectScope'
                  >;
                  overallDescription: {
                    __typename?: 'OverallDescriptionOutput';
                  } & Pick<
                    OverallDescriptionOutput,
                    | 'perspective'
                    | 'userCharacteristics'
                    | 'operatingEnvironment'
                    | 'designImplementationConstraints'
                    | 'userDocumentation'
                    | 'assemptionsDependencies'
                  >;
                  nonFunctionalRequirements: {
                    __typename?: 'NonFunctionalRequirementsOutput';
                  } & Pick<
                    NonFunctionalRequirementsOutput,
                    | 'performanceRequirements'
                    | 'safetyRequirements'
                    | 'securityRequirements'
                    | 'softwareQualityAttributes'
                  >;
                }
            >;
          };
        features: Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >;
        proposal?: Maybe<
          { __typename?: 'ProposalOutput' } & Pick<
            ProposalOutput,
            'summary' | 'purpose'
          > & {
              devtime: { __typename?: 'DevtimeOutput' } & Pick<
                DevtimeOutput,
                'months' | 'days' | 'hours'
              >;
              resources: Array<
                { __typename?: 'ResourceOutput' } & Pick<
                  ResourceOutput,
                  'resourceType' | 'developers'
                >
              >;
            }
        >;
        paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
          PaymentOptionOutput,
          'optOne' | 'optTwo' | 'optThree'
        >;
        delivrable?: Maybe<
          { __typename?: 'DelivrableOutput' } & Pick<
            DelivrableOutput,
            'fullBuild'
          > & {
              specification: { __typename?: 'File' } & Pick<
                File,
                'name' | 'src'
              >;
              mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            }
        >;
      }
  >;
};

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetProjectByIdQuery = { __typename?: 'QueryRoot' } & {
  getProjectById: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type AddProjectMutationVariables = Exact<{
  project: ProjectInput;
}>;

export type AddProjectMutation = { __typename?: 'MutationRoot' } & {
  addProject: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type ChangeProjectStateMutationVariables = Exact<{
  id: Scalars['String'];
  state: State;
}>;

export type ChangeProjectStateMutation = { __typename?: 'MutationRoot' } & {
  changeProjectState: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  image: InputFile;
}>;

export type UpdateProjectMutation = { __typename?: 'MutationRoot' } & {
  updateProject: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type AddProjectProposalMutationVariables = Exact<{
  id: Scalars['String'];
  proposal: ProposalInput;
}>;

export type AddProjectProposalMutation = { __typename?: 'MutationRoot' } & {
  addProjectProposal: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type AddProjectDesignMutationVariables = Exact<{
  design: ProjectFileInput;
}>;

export type AddProjectDesignMutation = { __typename?: 'MutationRoot' } & {
  addProjectDesign: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type AddProjectMvpMutationVariables = Exact<{
  mvp: ProjectFileInput;
}>;

export type AddProjectMvpMutation = { __typename?: 'MutationRoot' } & {
  addProjectMvp: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type AddProjectFullBuildMutationVariables = Exact<{
  fullBuild: ProjectFullBuildInput;
}>;

export type AddProjectFullBuildMutation = { __typename?: 'MutationRoot' } & {
  addProjectFullBuild: { __typename?: 'ProjectOutput' } & Pick<
    ProjectOutput,
    'id' | 'clientId' | 'name' | 'platforms' | 'state' | 'totalPrice'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      template: { __typename?: 'TemplateOutput' } & Pick<
        TemplateOutput,
        'id' | 'name' | 'description' | 'category'
      > & {
          features?: Maybe<
            Array<
              { __typename?: 'FeatureOutput' } & Pick<
                FeatureOutput,
                'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
              > & {
                  image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                  wireframes?: Maybe<
                    Array<
                      { __typename?: 'FileWithOutOId' } & Pick<
                        FileWithOutOId,
                        'id' | 'name' | 'src'
                      >
                    >
                  >;
                }
            >
          >;
          image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          specification?: Maybe<
            { __typename?: 'SpecificationOutput' } & Pick<
              SpecificationOutput,
              'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
            > & {
                introduction: { __typename?: 'IntroductionOutput' } & Pick<
                  IntroductionOutput,
                  | 'purpose'
                  | 'documentConventions'
                  | 'intendedAudience'
                  | 'projectScope'
                >;
                overallDescription: {
                  __typename?: 'OverallDescriptionOutput';
                } & Pick<
                  OverallDescriptionOutput,
                  | 'perspective'
                  | 'userCharacteristics'
                  | 'operatingEnvironment'
                  | 'designImplementationConstraints'
                  | 'userDocumentation'
                  | 'assemptionsDependencies'
                >;
                nonFunctionalRequirements: {
                  __typename?: 'NonFunctionalRequirementsOutput';
                } & Pick<
                  NonFunctionalRequirementsOutput,
                  | 'performanceRequirements'
                  | 'safetyRequirements'
                  | 'securityRequirements'
                  | 'softwareQualityAttributes'
                >;
              }
          >;
        };
      features: Array<
        { __typename?: 'FeatureOutput' } & Pick<
          FeatureOutput,
          'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
        > & {
            image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            wireframes?: Maybe<
              Array<
                { __typename?: 'FileWithOutOId' } & Pick<
                  FileWithOutOId,
                  'id' | 'name' | 'src'
                >
              >
            >;
          }
      >;
      proposal?: Maybe<
        { __typename?: 'ProposalOutput' } & Pick<
          ProposalOutput,
          'summary' | 'purpose'
        > & {
            devtime: { __typename?: 'DevtimeOutput' } & Pick<
              DevtimeOutput,
              'months' | 'days' | 'hours'
            >;
            resources: Array<
              { __typename?: 'ResourceOutput' } & Pick<
                ResourceOutput,
                'resourceType' | 'developers'
              >
            >;
          }
      >;
      paymentOption: { __typename?: 'PaymentOptionOutput' } & Pick<
        PaymentOptionOutput,
        'optOne' | 'optTwo' | 'optThree'
      >;
      delivrable?: Maybe<
        { __typename?: 'DelivrableOutput' } & Pick<
          DelivrableOutput,
          'fullBuild'
        > & {
            specification: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            mvp: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
            design: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
          }
      >;
    };
};

export type GetPrototypeByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetPrototypeByIdQuery = { __typename?: 'QueryRoot' } & {
  getPrototypeById: { __typename?: 'TemplateProtoTypeOutput' } & Pick<
    TemplateProtoTypeOutput,
    'id' | 'template'
  > & {
      prototype: Array<
        { __typename?: 'ProtoTypeOutput' } & {
          feature: { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            };
          connections: Array<
            { __typename?: 'ConnectionsOutput' } & Pick<
              ConnectionsOutput,
              'to'
            > & {
                releations: { __typename?: 'RelationsOutput' } & Pick<
                  RelationsOutput,
                  'back' | 'forword'
                >;
              }
          >;
        }
      >;
    };
};

export type AddPrototypeMutationVariables = Exact<{
  prototype: TemplateProtoTypeInput;
}>;

export type AddPrototypeMutation = { __typename?: 'MutationRoot' } & {
  addPrototype: { __typename?: 'TemplateProtoTypeOutput' } & Pick<
    TemplateProtoTypeOutput,
    'id' | 'template'
  > & {
      prototype: Array<
        { __typename?: 'ProtoTypeOutput' } & {
          feature: { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            };
          connections: Array<
            { __typename?: 'ConnectionsOutput' } & Pick<
              ConnectionsOutput,
              'to'
            > & {
                releations: { __typename?: 'RelationsOutput' } & Pick<
                  RelationsOutput,
                  'back' | 'forword'
                >;
              }
          >;
        }
      >;
    };
};

export type UpdatePrototypeMutationVariables = Exact<{
  prototype: TemplateProtoTypeInput;
}>;

export type UpdatePrototypeMutation = { __typename?: 'MutationRoot' } & {
  updatePrototype: { __typename?: 'TemplateProtoTypeOutput' } & Pick<
    TemplateProtoTypeOutput,
    'id' | 'template'
  > & {
      prototype: Array<
        { __typename?: 'ProtoTypeOutput' } & {
          feature: { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            };
          connections: Array<
            { __typename?: 'ConnectionsOutput' } & Pick<
              ConnectionsOutput,
              'to'
            > & {
                releations: { __typename?: 'RelationsOutput' } & Pick<
                  RelationsOutput,
                  'back' | 'forword'
                >;
              }
          >;
        }
      >;
    };
};

export type GetAllTemplatesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllTemplatesQuery = { __typename?: 'QueryRoot' } & {
  getAllTemplates: Array<
    { __typename?: 'TemplateOutput' } & Pick<
      TemplateOutput,
      'id' | 'name' | 'description' | 'category'
    > & {
        features?: Maybe<
          Array<
            { __typename?: 'FeatureOutput' } & Pick<
              FeatureOutput,
              'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
            > & {
                image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                wireframes?: Maybe<
                  Array<
                    { __typename?: 'FileWithOutOId' } & Pick<
                      FileWithOutOId,
                      'id' | 'name' | 'src'
                    >
                  >
                >;
              }
          >
        >;
        image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
        specification?: Maybe<
          { __typename?: 'SpecificationOutput' } & Pick<
            SpecificationOutput,
            'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
          > & {
              introduction: { __typename?: 'IntroductionOutput' } & Pick<
                IntroductionOutput,
                | 'purpose'
                | 'documentConventions'
                | 'intendedAudience'
                | 'projectScope'
              >;
              overallDescription: {
                __typename?: 'OverallDescriptionOutput';
              } & Pick<
                OverallDescriptionOutput,
                | 'perspective'
                | 'userCharacteristics'
                | 'operatingEnvironment'
                | 'designImplementationConstraints'
                | 'userDocumentation'
                | 'assemptionsDependencies'
              >;
              nonFunctionalRequirements: {
                __typename?: 'NonFunctionalRequirementsOutput';
              } & Pick<
                NonFunctionalRequirementsOutput,
                | 'performanceRequirements'
                | 'safetyRequirements'
                | 'securityRequirements'
                | 'softwareQualityAttributes'
              >;
            }
        >;
      }
  >;
};

export type GetTemplateByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetTemplateByIdQuery = { __typename?: 'QueryRoot' } & {
  getTemplateById: { __typename?: 'TemplateOutput' } & Pick<
    TemplateOutput,
    'id' | 'name' | 'description' | 'category'
  > & {
      features?: Maybe<
        Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >
      >;
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};

export type GetAllTemplatesByCategoriesIdQueryVariables = Exact<{
  categories: Array<Scalars['String']> | Scalars['String'];
}>;

export type GetAllTemplatesByCategoriesIdQuery = {
  __typename?: 'QueryRoot';
} & {
  getAllTemplatesByCategoriesId: Array<
    { __typename?: 'TemplateOutput' } & Pick<
      TemplateOutput,
      'id' | 'name' | 'description' | 'category'
    > & {
        features?: Maybe<
          Array<
            { __typename?: 'FeatureOutput' } & Pick<
              FeatureOutput,
              'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
            > & {
                image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
                wireframes?: Maybe<
                  Array<
                    { __typename?: 'FileWithOutOId' } & Pick<
                      FileWithOutOId,
                      'id' | 'name' | 'src'
                    >
                  >
                >;
              }
          >
        >;
        image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
        specification?: Maybe<
          { __typename?: 'SpecificationOutput' } & Pick<
            SpecificationOutput,
            'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
          > & {
              introduction: { __typename?: 'IntroductionOutput' } & Pick<
                IntroductionOutput,
                | 'purpose'
                | 'documentConventions'
                | 'intendedAudience'
                | 'projectScope'
              >;
              overallDescription: {
                __typename?: 'OverallDescriptionOutput';
              } & Pick<
                OverallDescriptionOutput,
                | 'perspective'
                | 'userCharacteristics'
                | 'operatingEnvironment'
                | 'designImplementationConstraints'
                | 'userDocumentation'
                | 'assemptionsDependencies'
              >;
              nonFunctionalRequirements: {
                __typename?: 'NonFunctionalRequirementsOutput';
              } & Pick<
                NonFunctionalRequirementsOutput,
                | 'performanceRequirements'
                | 'safetyRequirements'
                | 'securityRequirements'
                | 'softwareQualityAttributes'
              >;
            }
        >;
      }
  >;
};

export type AddTemplateMutationVariables = Exact<{
  template: TemplateInput;
}>;

export type AddTemplateMutation = { __typename?: 'MutationRoot' } & {
  addTemplate: { __typename?: 'TemplateOutput' } & Pick<
    TemplateOutput,
    'id' | 'name' | 'description' | 'category'
  > & {
      features?: Maybe<
        Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >
      >;
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};

export type UpdateTemplateMutationVariables = Exact<{
  id: Scalars['String'];
  template: TemplateUpdateInput;
  specification?: Maybe<SpecificationInput>;
}>;

export type UpdateTemplateMutation = { __typename?: 'MutationRoot' } & {
  updateTemplate: { __typename?: 'TemplateOutput' } & Pick<
    TemplateOutput,
    'id' | 'name' | 'description' | 'category'
  > & {
      features?: Maybe<
        Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >
      >;
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};

export type UpdateTemplateFeaturesMutationVariables = Exact<{
  id: Scalars['String'];
  featuresId: Array<Scalars['String']> | Scalars['String'];
}>;

export type UpdateTemplateFeaturesMutation = { __typename?: 'MutationRoot' } & {
  updateTemplateFeatures: { __typename?: 'TemplateOutput' } & Pick<
    TemplateOutput,
    'id' | 'name' | 'description' | 'category'
  > & {
      features?: Maybe<
        Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >
      >;
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};

export type AddTemplateSpecificationMutationVariables = Exact<{
  id: Scalars['String'];
  specification: SpecificationInput;
}>;

export type AddTemplateSpecificationMutation = {
  __typename?: 'MutationRoot';
} & {
  addTemplateSpecification: { __typename?: 'TemplateOutput' } & Pick<
    TemplateOutput,
    'id' | 'name' | 'description' | 'category'
  > & {
      features?: Maybe<
        Array<
          { __typename?: 'FeatureOutput' } & Pick<
            FeatureOutput,
            'id' | 'name' | 'description' | 'featureType' | 'price' | 'repo'
          > & {
              image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
              wireframes?: Maybe<
                Array<
                  { __typename?: 'FileWithOutOId' } & Pick<
                    FileWithOutOId,
                    'id' | 'name' | 'src'
                  >
                >
              >;
            }
        >
      >;
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};

export type DeleteTemplateMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteTemplateMutation = { __typename?: 'MutationRoot' } & {
  deleteTemplate: { __typename?: 'TemplateDefactoredOutput' } & Pick<
    TemplateDefactoredOutput,
    'id' | 'name' | 'description' | 'category' | 'features'
  > & {
      image: { __typename?: 'File' } & Pick<File, 'name' | 'src'>;
      specification?: Maybe<
        { __typename?: 'SpecificationOutput' } & Pick<
          SpecificationOutput,
          'otherRequirements' | 'glossary' | 'analysisModels' | 'issuesList'
        > & {
            introduction: { __typename?: 'IntroductionOutput' } & Pick<
              IntroductionOutput,
              | 'purpose'
              | 'documentConventions'
              | 'intendedAudience'
              | 'projectScope'
            >;
            overallDescription: {
              __typename?: 'OverallDescriptionOutput';
            } & Pick<
              OverallDescriptionOutput,
              | 'perspective'
              | 'userCharacteristics'
              | 'operatingEnvironment'
              | 'designImplementationConstraints'
              | 'userDocumentation'
              | 'assemptionsDependencies'
            >;
            nonFunctionalRequirements: {
              __typename?: 'NonFunctionalRequirementsOutput';
            } & Pick<
              NonFunctionalRequirementsOutput,
              | 'performanceRequirements'
              | 'safetyRequirements'
              | 'securityRequirements'
              | 'softwareQualityAttributes'
            >;
          }
      >;
    };
};
