// @ts-ignore
import Carousel, { consts } from 'react-elastic-carousel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import { useState, useEffect } from 'react';
import { roleVar, userVar } from '../../graphql/state';
import { Wrapper } from './styles';
import {
  Alert,
  Box,
  Button,
  CategoryCard,
  FeatureCard,
  Input,
  SectionSelector,
  Select,
  Spinner,
  TemplateCard,
  Text,
  TextArea,
} from '../../components';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Profile,
  Security,
} from '../../assets';
import {
  AddProjectMutation,
  AddProjectMutationVariables,
  AddProjectProposalMutation,
  AddProjectProposalMutationVariables,
  CategoryOutput,
  CountryPrefixModel,
  CreateUserMutation,
  CreateUserMutationVariables,
  DelivrableInput,
  FeatureOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  GetAllTemplatesByCategoriesIdQuery,
  GetAllTemplatesByCategoriesIdQueryVariables,
  GetAllUsersQuery,
  GetAllUsersQueryVariables,
  GetCountryCodesQuery,
  GetCountryCodesQueryVariables,
  PaymentOptionInput,
  ProjectInput,
  TemplateOutput,
  UserOutput,
} from '../../graphql/types';
import { theme } from '../../themes';
import { GET_ALL_CATEGORIES } from '../../graphql/category.api';
import { GET_ALL_TEMPLATES_BY_CATEGORIES_ID } from '../../graphql/template.api';
import { GET_ALL_FEATURES } from '../../graphql/feature.api';
import { ADD_PROJECT, ADD_PROJECT_PROPOSAL } from '../../graphql/project.api';
import { CREATE_USER, GET_ALL_USERS } from '../../graphql/admin.api';
import { GET_COUNTRY_CODES } from '../../graphql/auth.api';

const AddProject = () => {
  const history = useHistory();
  const role = useReactiveVar(roleVar);
  const currentUser = useReactiveVar(userVar);
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<
    | 'basic-info'
    | 'categories'
    | 'template'
    | 'features'
    | 'deliverables-platforms'
    | 'payment-options'
    | 'client-creation'
    | 'project-metadata'
  >('basic-info');
  const [project, setProject] = useState<Partial<ProjectInput>>();
  const [chosenCategories, setChosenCategories] = useState<Array<string>>([]);
  const [chosenTemplate, setChosenTemplate] = useState<
    TemplateOutput | undefined
  >();
  const [chosenFeatures, setChosenFeatures] = useState<Array<FeatureOutput>>(
    []
  );
  const [
    chosenDeliverables,
    setChosenDeliverables,
  ] = useState<DelivrableInput>();
  const [
    chosenPaymentOption,
    setChosenPaymentOption,
  ] = useState<PaymentOptionInput>();
  const [chosenPlatforms, setChosenPlatforms] = useState<Array<string>>([]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureOutput>();
  const [categories, setCategories] = useState<Array<CategoryOutput>>([]);
  const [templates, setTemplates] = useState<Array<TemplateOutput>>([]);
  const [features, setFeatures] = useState<Array<FeatureOutput>>([]);
  const [newUser, setNewUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: {
      prefix: string;
      number: string;
    };
    address: {
      place: string;
      city: string;
      country: string;
      zip: string;
    };
    role: 'Client' | 'ProductOwner' | 'Developer';
  }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: {
      prefix: '',
      number: '',
    },
    address: {
      place: '',
      city: '',
      country: '',
      zip: '',
    },
    role: 'Client',
  });
  const [selectedSection, setSelectedSection] = useState<
    'general' | 'security'
  >('general');
  const [countryCodes, setCountryCodes] = useState<Array<CountryPrefixModel>>(
    []
  );
  const [client, setClient] = useState<UserOutput>();
  const [proposal, setProposal] = useState<{
    devtime: {
      months: number;
      days: number;
      hours: number;
    };
    summary: string;
    purpose: string;
    resources: Array<{ resourceType: string; developers: number }>;
  }>();
  const [developers, setDevelopers] = useState<Array<UserOutput>>([]);

  const [getCategories, { loading: categoriesLoading }] = useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategories(getAllCategories);
    },
    fetchPolicy: 'network-only',
  });

  const [getTemplates, { loading: templatesLoading }] = useLazyQuery<
    GetAllTemplatesByCategoriesIdQuery,
    GetAllTemplatesByCategoriesIdQueryVariables
  >(GET_ALL_TEMPLATES_BY_CATEGORIES_ID, {
    onCompleted({ getAllTemplatesByCategoriesId }) {
      setTemplates(getAllTemplatesByCategoriesId);
    },
    fetchPolicy: 'network-only',
  });

  const [getFeatures, { loading: featuresLoading }] = useLazyQuery<
    GetAllFeaturesQuery,
    GetAllFeaturesQueryVariables
  >(GET_ALL_FEATURES, {
    onCompleted({ getAllFeatures }) {
      setFeatures(getAllFeatures);
    },
    fetchPolicy: 'network-only',
  });

  const [getDevelopers, { loading: developersLoading }] = useLazyQuery<
    GetAllUsersQuery,
    GetAllUsersQueryVariables
  >(GET_ALL_USERS, {
    onCompleted({ getAllUsers }) {
      setDevelopers(getAllUsers.filter((user) => user.role === 'Developer'));
    },
    fetchPolicy: 'network-only',
  });

  const [createUser, { loading: createUserLoading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    onCompleted({ createUser: createdUser }) {
      setClient(createdUser);
      setStep('project-metadata');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [
    addProjectProposal,
    { loading: addProjectProposalLoading },
  ] = useMutation<
    AddProjectProposalMutation,
    AddProjectProposalMutationVariables
  >(ADD_PROJECT_PROPOSAL, {
    onCompleted({ addProjectProposal: proposalData }) {
      history.push(`/project/${proposalData.id}`);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0].extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [addProject, { loading: addProjectLoading }] = useMutation<
    AddProjectMutation,
    AddProjectMutationVariables
  >(ADD_PROJECT, {
    onCompleted({ addProject: projectData }) {
      if (role === 'client') history.push(`/project/${projectData.id}`);
      else {
        addProjectProposal({
          variables: {
            id: projectData.id,
            proposal: {
              devtime: proposal?.devtime!,
              resources: proposal?.resources!,
              summary: proposal?.summary!,
              purpose: proposal?.summary!,
            },
          },
        });
      }
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0].extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  useEffect(() => {
    if (step === 'categories') getCategories();
    if (step === 'template')
      getTemplates({ variables: { categories: chosenCategories } });
    if (step === 'features') getFeatures();
    if (step === 'client-creation') getCountryCodes();
    if (step === 'project-metadata') getDevelopers();

    // eslint-disable-next-line
  }, [step]);

  const basicInfoForm = useFormik({
    initialValues: {
      name: '',
      imageName: '',
      imageSource: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
    }),
    onSubmit: ({ name, imageName, imageSource }) => {
      setProject({
        ...project,
        clientId: currentUser?.id,
        name,
        image: { name: imageName, src: imageSource },
      });
      setStep('categories');
    },
  });

  const categoriesForm = useFormik<{ selectedCategories: Array<string> }>({
    initialValues: {
      selectedCategories: [],
    },
    onSubmit: ({ selectedCategories }) => {
      if (selectedCategories.length === 0) {
        setError('Select at least one category');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setChosenCategories(selectedCategories);
      setStep('template');
    },
  });

  const templateForm = useFormik<{
    selectedTemplate: TemplateOutput | undefined;
  }>({
    initialValues: {
      selectedTemplate: undefined,
    },
    onSubmit: ({ selectedTemplate }) => {
      if (!selectedTemplate) {
        setError('You must select one template');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setChosenTemplate(selectedTemplate);
      setStep('features');
    },
  });

  const featuresForm = useFormik<{
    selectedFeatures: Array<FeatureOutput>;
  }>({
    initialValues: {
      selectedFeatures: [],
    },
    onSubmit: ({ selectedFeatures }) => {
      if (selectedFeatures.length === 0) {
        setError('Select at least one feature');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setChosenFeatures(selectedFeatures);
      setStep('deliverables-platforms');
    },
  });

  const deliverablesPlatformsForm = useFormik<{
    selectedDeliverables: DelivrableInput;
    selectedPlatforms: Array<string>;
  }>({
    initialValues: {
      selectedDeliverables: {
        specification: false,
        design: false,
        mvp: false,
        fullBuild: false,
      },
      selectedPlatforms: [],
    },
    onSubmit: ({ selectedDeliverables, selectedPlatforms }) => {
      if (
        Object.values(selectedDeliverables)
          .slice(0, 4)
          .filter((value) => value === true).length === 0
      ) {
        setError('Select at least one deliverable');
        setTimeout(() => setError(''), 3000);
        return;
      }
      if (selectedPlatforms.length === 0) {
        setError('Select at least one platform');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setChosenPlatforms(selectedPlatforms);
      setChosenDeliverables(selectedDeliverables);
      setStep('payment-options');
    },
  });

  const paymentOptionsForm = useFormik<{
    optOne: number;
    optTwo: number;
    optThree: number;
  }>({
    initialValues: {
      optOne: 0,
      optTwo: 0,
      optThree: 0,
    },
    onSubmit: ({ optOne, optTwo, optThree }) => {
      if (!optOne && !optTwo && !optThree) {
        setError('You must choose one payment option');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setChosenPaymentOption({ optOne, optTwo, optThree });
      if (role === 'client')
        addProject({
          variables: {
            project: {
              name: project?.name!,
              image: {
                name: project?.image?.name!,
                src: project?.image?.src!,
              },
              features: chosenFeatures.map((feature) => feature.id)!,
              template: chosenTemplate?.id!,
              clientId: currentUser?.id!,
              platforms: chosenPlatforms,
              delivrable: chosenDeliverables,
              paymentOption: {
                optOne,
                optTwo,
                optThree,
              }!,
              totalPrice: chosenFeatures.reduce(
                (accumulator, feature) => accumulator + feature.price,
                0
              ),
            },
          },
        });

      if (role === 'productOwner') setStep('client-creation');
    },
  });

  const clientCreationGeneralForm = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      prefix: '',
      number: '',
      place: '',
      city: '',
      zip: '',
      country: '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      prefix: Yup.string().required('Prefix is required'),
      // prettier-ignore
      number: Yup.number().typeError('Phone must be a number').required('Phone is required'),
      place: Yup.string().required('Address is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      // prettier-ignore
      zip: Yup.number().typeError('Zip must be a number').required('Zip is required'),
    }),
    onSubmit: ({
      firstName,
      lastName,
      email,
      prefix,
      number,
      place,
      city,
      country,
      zip,
    }) => {
      setNewUser({
        ...newUser,
        firstName,
        lastName,
        email,
        phone: { prefix, number },
        address: { place, city, country, zip },
      });
      setSelectedSection('security');
    },
  });

  const [getCountryCodes, { loading: countryCodesLoading }] = useLazyQuery<
    GetCountryCodesQuery,
    GetCountryCodesQueryVariables
  >(GET_COUNTRY_CODES, {
    onCompleted({ getCountryCode }) {
      setCountryCodes(getCountryCode);
      clientCreationGeneralForm.setFieldValue(
        'prefix',
        getCountryCode[0].prefix
      );
      clientCreationGeneralForm.setFieldValue(
        'country',
        getCountryCode[0].country
      );
    },
    fetchPolicy: 'network-only',
  });

  const clientCreationSecurityForm = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is 6 characters minimum'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf(
          [Yup.ref('password')],
          "Confirm new password doesn't match with new password"
        ),
    }),
    onSubmit: ({ password }) => {
      setNewUser({ ...newUser, password });
      createUser({ variables: { user: { ...newUser, password } } });
    },
  });

  const projectMetadataForm = useFormik<{
    frontendDevelopers: Array<string>;
    backendDevelopers: Array<string>;
    months: string;
    summary: string;
    purpose: string;
  }>({
    initialValues: {
      frontendDevelopers: [],
      backendDevelopers: [],
      months: '',
      summary: '',
      purpose: '',
    },
    validationSchema: Yup.object().shape({
      summary: Yup.string().required('Summary is required'),
      purpose: Yup.string().required('Purpose is required'),
      // prettier-ignore
      months: Yup.number().typeError('Months must be a number').required('Months is required'),
    }),
    onSubmit: ({
      frontendDevelopers,
      backendDevelopers,
      months,
      summary,
      purpose,
    }) => {
      if (
        !frontendDevelopers ||
        frontendDevelopers.length === 0 ||
        !backendDevelopers ||
        backendDevelopers.length === 0
      ) {
        setError('You must select developers for your project');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setProposal({
        ...proposal,
        devtime: {
          months: parseInt(months, 10),
          days: 0,
          hours: 0,
        },
        resources: [
          {
            resourceType: 'frontend-developers',
            developers: frontendDevelopers.length,
          },
          {
            resourceType: 'backend-developers',
            developers: backendDevelopers.length,
          },
        ],
        summary,
        purpose,
      });
      addProject({
        variables: {
          project: {
            name: project?.name!,
            image: {
              name: project?.image?.name!,
              src: project?.image?.src!,
            },
            features: chosenFeatures.map((feature) => feature.id)!,
            template: chosenTemplate?.id!,
            clientId: client?.id!,
            platforms: chosenPlatforms,
            delivrable: chosenDeliverables,
            paymentOption: {
              optOne: chosenPaymentOption?.optOne!,
              optTwo: chosenPaymentOption?.optTwo!,
              optThree: chosenPaymentOption?.optThree!,
            }!,
            totalPrice: chosenFeatures.reduce(
              (accumulator, feature) => accumulator + feature.price,
              0
            ),
          },
        },
      });
    },
  });

  const carouselSettings = {
    pagination: false,
    itemsToShow: 1,
    enableSwipe: true,
    isRTL: false,
    disableArrowsOnEnd: true,
    enableTilt: false,
    renderArrow: ({
      type,
      onClick,
      isEdge,
    }: {
      type: string;
      onClick: () => void;
      isEdge: boolean;
    }) => (
      <>
        {type !== consts.PREV ? (
          <button
            onClick={onClick}
            disabled={isEdge}
            type='button'
            className='carousel-arrow'
          >
            <ChevronRight width='48px' height='48px' />
          </button>
        ) : (
          <button
            onClick={onClick}
            disabled={isEdge}
            type='button'
            className='carousel-arrow'
          >
            <ChevronLeft width='48px' height='48px' />
          </button>
        )}
      </>
    ),
    transitionMs: 0,
  };

  return (
    <Wrapper color={role}>
      <Box padding='35px 45px 30px 120px'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          marginBottom='20px'
        >
          <Box flexGrow='1' marginRight='20px'>
            <Button
              text='Back'
              color={role || 'client'}
              size='small'
              onClick={() => history.goBack()}
              iconLeft={<ArrowLeft />}
            />
            <Text variant='headline' weight='bold'>
              {step === 'basic-info' && 'Create Project'}
              {step === 'categories' && 'Choose Categories'}
              {step === 'template' && 'Choose Template'}
              {step === 'features' && 'Choose Features'}
              {step === 'deliverables-platforms' &&
                'Choose Deliverables and Platforms'}
              {step === 'payment-options' && 'Choose Payment Options'}
              {step === 'client-creation' && 'Create client'}
              {step === 'project-metadata' && 'Set project metadata'}
            </Text>
          </Box>
          {error && <Alert color='error' text={error} />}
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            marginLeft='20px'
          >
            <Box marginRight='20px'>
              <Button
                text='Previous'
                color={role || 'client'}
                variant='outlined'
                iconLeft={<ArrowLeft />}
                onClick={() => {
                  if (step === 'categories') setStep('basic-info');
                  if (step === 'template') setStep('categories');
                  if (step === 'features') setStep('template');
                  if (step === 'deliverables-platforms') setStep('features');
                  if (step === 'payment-options')
                    setStep('deliverables-platforms');
                  if (step === 'project-metadata') setStep('client-creation');
                }}
              />
            </Box>
            <Box>
              <Button
                text={
                  role === 'client' && step === 'payment-options'
                    ? 'Save'
                    : 'Next'
                }
                loading={
                  role === 'client'
                    ? addProjectLoading
                    : addProjectProposalLoading
                }
                color={role || 'client'}
                variant='primary-action'
                iconRight={<ArrowRight />}
                onClick={() => {
                  if (step === 'basic-info') basicInfoForm.handleSubmit();
                  if (step === 'categories') categoriesForm.handleSubmit();
                  if (step === 'template') templateForm.handleSubmit();
                  if (step === 'features') featuresForm.handleSubmit();
                  if (step === 'deliverables-platforms')
                    deliverablesPlatformsForm.handleSubmit();
                  if (step === 'payment-options')
                    paymentOptionsForm.handleSubmit();
                  if (step === 'client-creation')
                    clientCreationSecurityForm.handleSubmit();
                  if (step === 'project-metadata')
                    projectMetadataForm.handleSubmit();
                }}
              />
            </Box>
          </Box>
        </Box>
        {step === 'basic-info' && (
          <Box
            display='grid'
            gridTemplateColumns='0.7fr 0.5fr'
            columnGap='45px'
            alignItems='stretch'
          >
            <form onSubmit={basicInfoForm.handleSubmit}>
              <Box
                display='grid'
                gridTemplateColumns='auto'
                rowGap='0.5rem'
                position='relative'
              >
                <Input
                  name='name'
                  label='Name'
                  color={role || 'client'}
                  value={basicInfoForm.values.name}
                  onChange={basicInfoForm.handleChange}
                  onBlur={basicInfoForm.handleBlur}
                  error={
                    basicInfoForm.touched.name && !!basicInfoForm.errors.name
                  }
                  errorMessage={basicInfoForm.errors.name}
                />
                <Input
                  type='file'
                  label='Image'
                  color={role || 'client'}
                  onChange={async (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const formData = new FormData();

                    if (event.target.files && event.target.files[0]) {
                      formData.append('file', event.target.files[0]);
                      formData.append('upload_preset', 'xofll5kc');

                      basicInfoForm.setFieldValue('imageName', '');
                      basicInfoForm.setFieldValue('imageSource', '');

                      const data = await (
                        await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
                          method: 'POST',
                          body: formData,
                        })
                      ).json();

                      const filename = data.original_filename;
                      const filesource = data.secure_url;

                      basicInfoForm.setFieldValue('imageName', filename);
                      basicInfoForm.setFieldValue('imageSource', filesource);
                    }
                  }}
                  error={
                    basicInfoForm.touched.imageName &&
                    (!!basicInfoForm.errors.imageName ||
                      !!basicInfoForm.errors.imageSource)
                  }
                  errorMessage={basicInfoForm.errors.imageName}
                />
              </Box>
            </form>
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              padding='100px'
              background='#ffffff'
              boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
              borderRadius='10px'
            >
              <Box
                className='project-image'
                background={
                  (basicInfoForm.values.imageSource &&
                    `url(${basicInfoForm.values.imageSource})`) ||
                  theme.colors.client.light
                }
                width='150px'
                height='150px'
                borderRadius='50%'
                marginBottom='20px'
              ></Box>
              <Box>
                <Text variant='headline' weight='bold'>
                  {basicInfoForm.values.name || 'Project Name'}
                </Text>
              </Box>
            </Box>
          </Box>
        )}
        {step === 'categories' && (
          <>
            {!categoriesLoading ? (
              <form onSubmit={categoriesForm.handleSubmit}>
                <Box
                  display='grid'
                  gridTemplateColumns='repeat(3, 1fr)'
                  gap='35px'
                  alignItems='center'
                  justifyContent='center'
                >
                  {categories &&
                    categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        color={role || 'client'}
                        selectable
                        selected={categoriesForm.values.selectedCategories?.includes(
                          category.id
                        )}
                        toggleSelect={() => {
                          if (
                            categoriesForm.values.selectedCategories &&
                            !categoriesForm.values.selectedCategories.includes(
                              category.id
                            )
                          ) {
                            categoriesForm.setFieldValue(
                              'selectedCategories',
                              categoriesForm.values.selectedCategories.concat(
                                category.id
                              )
                            );
                          } else {
                            categoriesForm.setFieldValue(
                              'selectedCategories',
                              categoriesForm.values.selectedCategories &&
                                categoriesForm.values.selectedCategories.filter(
                                  (id) => id !== category.id
                                )
                            );
                          }
                        }}
                      />
                    ))}
                </Box>
              </form>
            ) : (
              <Spinner fullScreen color={role} />
            )}
          </>
        )}
        {step === 'template' && (
          <>
            {!templatesLoading ? (
              <form onSubmit={templateForm.handleSubmit}>
                <Box
                  display='grid'
                  gridTemplateColumns='repeat(3, 1fr)'
                  gap='35px'
                  alignItems='center'
                  justifyContent='center'
                >
                  {templates &&
                    templates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        color={role || 'client'}
                        selectable
                        selected={
                          templateForm.values.selectedTemplate?.id ===
                          template.id
                        }
                        toggleSelect={() => {
                          if (!templateForm.values.selectedTemplate) {
                            templateForm.setFieldValue(
                              'selectedTemplate',
                              template
                            );
                          } else if (
                            templateForm.values.selectedTemplate.id ===
                            template.id
                          ) {
                            templateForm.setFieldValue(
                              'selectedTemplate',
                              undefined
                            );
                          } else {
                            templateForm.setFieldValue(
                              'selectedTemplate',
                              template
                            );
                          }
                        }}
                      />
                    ))}
                </Box>
              </form>
            ) : (
              <Spinner fullScreen color={role} />
            )}
          </>
        )}
        {step === 'features' && (
          <>
            {!featuresLoading ? (
              <Box
                display='grid'
                gridTemplateColumns='0.5fr 0.7fr'
                columnGap='45px'
                alignItems='stretch'
              >
                <form onSubmit={featuresForm.handleSubmit}>
                  <Box
                    height='700px'
                    overflowY='scroll'
                    padding='15px'
                    borderRadius='10px'
                    background={theme.colors[role || 'client'].light}
                    boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  >
                    {features &&
                      features.map((feature) => (
                        <Box key={feature.id} marginBottom='30px'>
                          <FeatureCard
                            feature={feature}
                            color={role || 'client'}
                            selectable
                            selected={featuresForm.values.selectedFeatures?.includes(
                              feature
                            )}
                            toggleSelect={() => {
                              setSelectedFeature(feature);
                              if (
                                featuresForm.values.selectedFeatures &&
                                !featuresForm.values.selectedFeatures.includes(
                                  feature
                                )
                              ) {
                                featuresForm.setFieldValue(
                                  'selectedFeatures',
                                  featuresForm.values.selectedFeatures.concat(
                                    feature
                                  )
                                );
                              } else {
                                featuresForm.setFieldValue(
                                  'selectedFeatures',
                                  featuresForm.values.selectedFeatures &&
                                    featuresForm.values.selectedFeatures.filter(
                                      ({ id }) => id !== feature.id
                                    )
                                );
                              }
                            }}
                          />
                        </Box>
                      ))}
                  </Box>
                </form>
                <Box
                  padding='20px'
                  borderRadius='10px'
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  height='500px'
                  background='#ffffff'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                >
                  {selectedFeature && (
                    <>
                      <Box marginBottom='30px' width='100%'>
                        <Text variant='title' weight='bold' gutterBottom>
                          {selectedFeature.name}
                        </Text>
                        <Text variant='body' gutterBottom>
                          {selectedFeature.description}
                        </Text>
                      </Box>
                      <Carousel {...carouselSettings}>
                        {selectedFeature?.wireframes?.map((wireframe) => (
                          <Box
                            width='150px'
                            height='300px'
                            background={`url(${wireframe.src})`}
                          ></Box>
                        ))}
                      </Carousel>
                    </>
                  )}
                </Box>
              </Box>
            ) : (
              <Spinner fullScreen color={role} />
            )}
          </>
        )}
        {step === 'deliverables-platforms' && (
          <form onSubmit={deliverablesPlatformsForm.handleSubmit}>
            <Box>
              <Box marginBottom='20px'>
                <Text variant='headline' weight='bold' gutterBottom>
                  Deliverables
                </Text>
              </Box>
              <Box
                display='grid'
                gridTemplateColumns='repeat(4, 1fr)'
                alignItems='center'
                columnGap='30px'
                marginBottom='20px'
              >
                <Box
                  padding='10px'
                  background='white'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  onClick={() => {
                    deliverablesPlatformsForm.setFieldValue(
                      'selectedDeliverables',
                      {
                        ...deliverablesPlatformsForm.values
                          .selectedDeliverables,
                        specification: !deliverablesPlatformsForm.values
                          .selectedDeliverables.specification,
                      }
                    );
                  }}
                  border={
                    deliverablesPlatformsForm.values.selectedDeliverables
                      .specification
                      ? `2px solid ${theme.colors[role || 'client'].main}`
                      : undefined
                  }
                  display='grid'
                  gridTemplateRows='auto'
                  alignItems='center'
                  rowGap='10px'
                  borderRadius='10px'
                  cursor='pointer'
                >
                  <Text variant='title' weight='bold'>
                    Specification
                  </Text>
                </Box>
                <Box
                  padding='10px'
                  background='white'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  onClick={() => {
                    deliverablesPlatformsForm.setFieldValue(
                      'selectedDeliverables',
                      {
                        ...deliverablesPlatformsForm.values
                          .selectedDeliverables,
                        design: !deliverablesPlatformsForm.values
                          .selectedDeliverables.design,
                      }
                    );
                  }}
                  border={
                    deliverablesPlatformsForm.values.selectedDeliverables.design
                      ? `2px solid ${theme.colors[role || 'client'].main}`
                      : undefined
                  }
                  display='grid'
                  gridTemplateRows='auto'
                  alignItems='center'
                  rowGap='10px'
                  borderRadius='10px'
                  cursor='pointer'
                >
                  <Text variant='title' weight='bold'>
                    Design
                  </Text>
                </Box>
                <Box
                  padding='10px'
                  background='white'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  onClick={() => {
                    deliverablesPlatformsForm.setFieldValue(
                      'selectedDeliverables',
                      {
                        ...deliverablesPlatformsForm.values
                          .selectedDeliverables,
                        mvp: !deliverablesPlatformsForm.values
                          .selectedDeliverables.mvp,
                      }
                    );
                  }}
                  border={
                    deliverablesPlatformsForm.values.selectedDeliverables.mvp
                      ? `2px solid ${theme.colors[role || 'client'].main}`
                      : undefined
                  }
                  display='grid'
                  gridTemplateRows='auto'
                  alignItems='center'
                  rowGap='10px'
                  borderRadius='10px'
                  cursor='pointer'
                >
                  <Text variant='title' weight='bold'>
                    MVP
                  </Text>
                </Box>
                <Box
                  padding='10px'
                  background='white'
                  boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                  onClick={() => {
                    deliverablesPlatformsForm.setFieldValue(
                      'selectedDeliverables',
                      {
                        ...deliverablesPlatformsForm.values
                          .selectedDeliverables,
                        fullBuild: !deliverablesPlatformsForm.values
                          .selectedDeliverables.fullBuild,
                      }
                    );
                  }}
                  border={
                    deliverablesPlatformsForm.values.selectedDeliverables
                      .fullBuild
                      ? `2px solid ${theme.colors[role || 'client'].main}`
                      : undefined
                  }
                  display='grid'
                  gridTemplateRows='auto'
                  alignItems='center'
                  rowGap='10px'
                  borderRadius='10px'
                  cursor='pointer'
                >
                  <Text variant='title' weight='bold'>
                    Full Build
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box marginBottom='20px'>
                <Text variant='headline' weight='bold' gutterBottom>
                  Platforms
                </Text>
                <Box
                  display='grid'
                  gridTemplateColumns='repeat(4, 1fr)'
                  columnGap='30px'
                  marginBottom='20px'
                >
                  <Box
                    padding='10px'
                    background='white'
                    boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                    onClick={() => {
                      if (
                        !deliverablesPlatformsForm.values.selectedPlatforms.includes(
                          'web'
                        )
                      ) {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.concat(
                            'web'
                          )
                        );
                      } else {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.filter(
                            (platform) => platform !== 'web'
                          )
                        );
                      }
                    }}
                    border={
                      deliverablesPlatformsForm.values.selectedPlatforms.includes(
                        'web'
                      )
                        ? `2px solid ${theme.colors[role || 'client'].main}`
                        : undefined
                    }
                    display='grid'
                    gridTemplateRows='auto'
                    alignItems='center'
                    rowGap='10px'
                    borderRadius='10px'
                    cursor='pointer'
                  >
                    <Text variant='title' weight='bold'>
                      Web
                    </Text>
                  </Box>
                  <Box
                    padding='10px'
                    background='white'
                    boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                    onClick={() => {
                      if (
                        !deliverablesPlatformsForm.values.selectedPlatforms.includes(
                          'android'
                        )
                      ) {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.concat(
                            'android'
                          )
                        );
                      } else {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.filter(
                            (platform) => platform !== 'android'
                          )
                        );
                      }
                    }}
                    border={
                      deliverablesPlatformsForm.values.selectedPlatforms.includes(
                        'android'
                      )
                        ? `2px solid ${theme.colors[role || 'client'].main}`
                        : undefined
                    }
                    display='grid'
                    gridTemplateRows='auto'
                    alignItems='center'
                    rowGap='10px'
                    borderRadius='10px'
                    cursor='pointer'
                  >
                    <Text variant='title' weight='bold'>
                      Android
                    </Text>
                  </Box>
                  <Box
                    padding='10px'
                    background='white'
                    boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                    onClick={() => {
                      if (
                        !deliverablesPlatformsForm.values.selectedPlatforms.includes(
                          'ios'
                        )
                      ) {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.concat(
                            'ios'
                          )
                        );
                      } else {
                        deliverablesPlatformsForm.setFieldValue(
                          'selectedPlatforms',
                          deliverablesPlatformsForm.values.selectedPlatforms.filter(
                            (platform) => platform !== 'ios'
                          )
                        );
                      }
                    }}
                    border={
                      deliverablesPlatformsForm.values.selectedPlatforms.includes(
                        'ios'
                      )
                        ? `2px solid ${theme.colors[role || 'client'].main}`
                        : undefined
                    }
                    display='grid'
                    gridTemplateRows='auto'
                    alignItems='center'
                    rowGap='10px'
                    borderRadius='10px'
                    cursor='pointer'
                  >
                    <Text variant='title' weight='bold'>
                      iOS
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </form>
        )}
        {step === 'payment-options' && (
          <form onSubmit={paymentOptionsForm.handleSubmit}>
            <Box
              display='grid'
              gridTemplateColumns='repeat(4, 1fr)'
              columnGap='30px'
              marginBottom='20px'
            >
              <Box
                padding='10px'
                background='white'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                onClick={() => {
                  if (
                    !paymentOptionsForm.values.optOne &&
                    !paymentOptionsForm.values.optTwo &&
                    !paymentOptionsForm.values.optThree
                  ) {
                    paymentOptionsForm.setFieldValue('optOne', 30);
                    paymentOptionsForm.setFieldValue('optTwo', 30);
                    paymentOptionsForm.setFieldValue('optThree', 40);
                  } else {
                    paymentOptionsForm.setFieldValue('optOne', 0);
                    paymentOptionsForm.setFieldValue('optTwo', 0);
                    paymentOptionsForm.setFieldValue('optThree', 0);
                  }
                }}
                border={
                  paymentOptionsForm.values.optOne === 30 &&
                  paymentOptionsForm.values.optTwo === 30 &&
                  paymentOptionsForm.values.optThree === 40
                    ? `2px solid ${theme.colors[role || 'client'].main}`
                    : undefined
                }
                display='grid'
                gridTemplateRows='auto'
                alignItems='center'
                rowGap='10px'
                borderRadius='10px'
                cursor='pointer'
              >
                <Text variant='title' weight='bold'>
                  30% - 30% - 40%
                </Text>
              </Box>
              <Box
                padding='10px'
                background='white'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                onClick={() => {
                  if (
                    !paymentOptionsForm.values.optOne &&
                    !paymentOptionsForm.values.optTwo &&
                    !paymentOptionsForm.values.optThree
                  ) {
                    paymentOptionsForm.setFieldValue('optOne', 50);
                    paymentOptionsForm.setFieldValue('optTwo', 25);
                    paymentOptionsForm.setFieldValue('optThree', 25);
                  } else {
                    paymentOptionsForm.setFieldValue('optOne', 0);
                    paymentOptionsForm.setFieldValue('optTwo', 0);
                    paymentOptionsForm.setFieldValue('optThree', 0);
                  }
                }}
                border={
                  paymentOptionsForm.values.optOne === 50 &&
                  paymentOptionsForm.values.optTwo === 25 &&
                  paymentOptionsForm.values.optThree === 25
                    ? `2px solid ${theme.colors[role || 'client'].main}`
                    : undefined
                }
                display='grid'
                gridTemplateRows='auto'
                alignItems='center'
                rowGap='10px'
                borderRadius='10px'
                cursor='pointer'
              >
                <Text variant='title' weight='bold'>
                  50% - 25% - 25%
                </Text>
              </Box>
              <Box
                padding='10px'
                background='white'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                onClick={() => {
                  if (
                    !paymentOptionsForm.values.optOne &&
                    !paymentOptionsForm.values.optTwo &&
                    !paymentOptionsForm.values.optThree
                  ) {
                    paymentOptionsForm.setFieldValue('optOne', 50);
                    paymentOptionsForm.setFieldValue('optTwo', 30);
                    paymentOptionsForm.setFieldValue('optThree', 20);
                  } else {
                    paymentOptionsForm.setFieldValue('optOne', 0);
                    paymentOptionsForm.setFieldValue('optTwo', 0);
                    paymentOptionsForm.setFieldValue('optThree', 0);
                  }
                }}
                border={
                  paymentOptionsForm.values.optOne === 50 &&
                  paymentOptionsForm.values.optTwo === 30 &&
                  paymentOptionsForm.values.optThree === 20
                    ? `2px solid ${theme.colors[role || 'client'].main}`
                    : undefined
                }
                display='grid'
                gridTemplateRows='auto'
                alignItems='center'
                rowGap='10px'
                borderRadius='10px'
                cursor='pointer'
              >
                <Text variant='title' weight='bold'>
                  50% - 30% - 20%
                </Text>
              </Box>
              <Box
                padding='10px'
                background='white'
                boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                onClick={() => {
                  if (
                    !paymentOptionsForm.values.optOne &&
                    !paymentOptionsForm.values.optTwo &&
                    !paymentOptionsForm.values.optThree
                  ) {
                    paymentOptionsForm.setFieldValue('optOne', 20);
                    paymentOptionsForm.setFieldValue('optTwo', 30);
                    paymentOptionsForm.setFieldValue('optThree', 50);
                  } else {
                    paymentOptionsForm.setFieldValue('optOne', 0);
                    paymentOptionsForm.setFieldValue('optTwo', 0);
                    paymentOptionsForm.setFieldValue('optThree', 0);
                  }
                }}
                border={
                  paymentOptionsForm.values.optOne === 20 &&
                  paymentOptionsForm.values.optTwo === 30 &&
                  paymentOptionsForm.values.optThree === 50
                    ? `2px solid ${theme.colors[role || 'client'].main}`
                    : undefined
                }
                display='grid'
                gridTemplateRows='auto'
                alignItems='center'
                rowGap='10px'
                borderRadius='10px'
                cursor='pointer'
              >
                <Text variant='title' weight='bold'>
                  20% - 30% - 50%
                </Text>
              </Box>
            </Box>
          </form>
        )}
        {step === 'client-creation' && (
          <>
            <Box
              display='grid'
              gridTemplateColumns='0.5fr 2fr'
              columnGap='25px'
              marginTop='1rem'
            >
              <Box display='grid' rowGap='0.5rem' gridTemplateRows='50px'>
                <SectionSelector
                  icon={<Profile />}
                  color={role || 'client'}
                  text='General'
                  selected={selectedSection === 'general'}
                />
                <SectionSelector
                  icon={<Security />}
                  color={role || 'client'}
                  text='Security'
                  selected={selectedSection === 'security'}
                />
              </Box>
              <Box
                background='white'
                boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
                borderRadius='10px'
                width='100%'
                padding='30px'
              >
                <Box
                  display='grid'
                  gridTemplateColumns='auto 1fr'
                  columnGap='1rem'
                  alignItems='center'
                  marginBottom='50px'
                >
                  <Text variant='subheader' weight='bold'>
                    {selectedSection === 'general' ? 'General' : 'Security'}
                  </Text>
                  {error && <Alert color='error' text={error} />}
                </Box>
                {selectedSection === 'general' && (
                  <>
                    {!countryCodesLoading ? (
                      <Box
                        display='grid'
                        gridTemplateColumns='auto'
                        rowGap='0.5rem'
                        position='relative'
                      >
                        <Input
                          name='firstName'
                          label='First Name'
                          color={role || 'client'}
                          value={clientCreationGeneralForm.values.firstName}
                          onChange={clientCreationGeneralForm.handleChange}
                          onBlur={clientCreationGeneralForm.handleBlur}
                          error={
                            clientCreationGeneralForm.touched.firstName &&
                            !!clientCreationGeneralForm.errors.firstName
                          }
                          errorMessage={
                            clientCreationGeneralForm.errors.firstName
                          }
                        />
                        <Input
                          name='lastName'
                          label='Last Name'
                          color={role || 'client'}
                          value={clientCreationGeneralForm.values.lastName}
                          onChange={clientCreationGeneralForm.handleChange}
                          onBlur={clientCreationGeneralForm.handleBlur}
                          error={
                            clientCreationGeneralForm.touched.lastName &&
                            !!clientCreationGeneralForm.errors.lastName
                          }
                          errorMessage={
                            clientCreationGeneralForm.errors.lastName
                          }
                        />
                        <Input
                          name='email'
                          label='Email'
                          color={role || 'client'}
                          value={clientCreationGeneralForm.values.email}
                          onChange={clientCreationGeneralForm.handleChange}
                          onBlur={clientCreationGeneralForm.handleBlur}
                          error={
                            clientCreationGeneralForm.touched.email &&
                            !!clientCreationGeneralForm.errors.email
                          }
                          errorMessage={clientCreationGeneralForm.errors.email}
                        />
                        <Box
                          display='grid'
                          gridTemplateColumns='1fr 1.5fr'
                          columnGap='10px'
                        >
                          <Select
                            name='prefix'
                            label='Country Code'
                            color={role || 'client'}
                            options={
                              countryCodes
                                ? countryCodes.map(({ prefix, country }) => ({
                                    value: prefix,
                                    label: `+${prefix} (${country})`,
                                  }))
                                : [{ value: '216', label: '+216' }]
                            }
                            onChange={clientCreationGeneralForm.handleChange}
                            onBlur={clientCreationGeneralForm.handleBlur}
                            value={clientCreationGeneralForm.values.prefix}
                            select={clientCreationGeneralForm.values.prefix}
                            error={
                              clientCreationGeneralForm.touched.prefix &&
                              !!clientCreationGeneralForm.errors.prefix
                            }
                            errorMessage={
                              clientCreationGeneralForm.errors.prefix
                            }
                          />
                          <Input
                            name='number'
                            type='tel'
                            label='Phone'
                            color={role || 'client'}
                            onChange={clientCreationGeneralForm.handleChange}
                            onBlur={clientCreationGeneralForm.handleBlur}
                            value={clientCreationGeneralForm.values.number}
                            error={
                              clientCreationGeneralForm.touched.number &&
                              !!clientCreationGeneralForm.errors.number
                            }
                            errorMessage={
                              clientCreationGeneralForm.errors.number
                            }
                          />
                        </Box>
                        <Input
                          name='place'
                          label='Address'
                          color={role || 'client'}
                          onChange={clientCreationGeneralForm.handleChange}
                          onBlur={clientCreationGeneralForm.handleBlur}
                          value={clientCreationGeneralForm.values.place}
                          error={
                            clientCreationGeneralForm.touched.place &&
                            !!clientCreationGeneralForm.errors.place
                          }
                          errorMessage={clientCreationGeneralForm.errors.place}
                        />
                        <Input
                          name='city'
                          label='City'
                          color={role || 'client'}
                          onChange={clientCreationGeneralForm.handleChange}
                          onBlur={clientCreationGeneralForm.handleBlur}
                          value={clientCreationGeneralForm.values.city}
                          error={
                            clientCreationGeneralForm.touched.city &&
                            !!clientCreationGeneralForm.errors.city
                          }
                          errorMessage={clientCreationGeneralForm.errors.city}
                        />
                        <Box
                          display='grid'
                          gridTemplateColumns='2fr 1fr'
                          columnGap='10px'
                        >
                          <Select
                            name='country'
                            label='Country'
                            color={role || 'client'}
                            options={
                              countryCodes
                                ? countryCodes.map(({ country }) => ({
                                    value: country,
                                    label: country,
                                  }))
                                : [{ value: 'Tunisia', label: 'Tunisia' }]
                            }
                            onChange={clientCreationGeneralForm.handleChange}
                            onBlur={clientCreationGeneralForm.handleBlur}
                            value={clientCreationGeneralForm.values.country}
                            select={clientCreationGeneralForm.values.country}
                            error={
                              clientCreationGeneralForm.touched.country &&
                              !!clientCreationGeneralForm.errors.country
                            }
                            errorMessage={
                              clientCreationGeneralForm.errors.country
                            }
                          />
                          <Input
                            name='zip'
                            label='Zip Code'
                            color={role || 'client'}
                            onChange={clientCreationGeneralForm.handleChange}
                            onBlur={clientCreationGeneralForm.handleBlur}
                            value={clientCreationGeneralForm.values.zip}
                            error={
                              clientCreationGeneralForm.touched.zip &&
                              !!clientCreationGeneralForm.errors.zip
                            }
                            errorMessage={clientCreationGeneralForm.errors.zip}
                          />
                        </Box>
                        <Box
                          marginTop='0.5rem'
                          display='grid'
                          gridTemplateColumns='repeat(2, auto)'
                          justifyContent='flex-end'
                        >
                          <Button
                            variant='primary-action'
                            color={role || 'client'}
                            text='Next'
                            onClick={clientCreationGeneralForm.handleSubmit}
                            type='submit'
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        display='grid'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Spinner color={role || 'client'} />
                      </Box>
                    )}
                  </>
                )}
                {selectedSection === 'security' && (
                  <Box
                    display='grid'
                    gridTemplateColumns='auto'
                    rowGap='0.5rem'
                    position='relative'
                  >
                    <Input
                      name='password'
                      label='Password'
                      color={role || 'client'}
                      type='password'
                      value={clientCreationSecurityForm.values.password}
                      onChange={clientCreationSecurityForm.handleChange}
                      onBlur={clientCreationSecurityForm.handleBlur}
                      error={
                        clientCreationSecurityForm.touched.password &&
                        !!clientCreationSecurityForm.errors.password
                      }
                      errorMessage={clientCreationSecurityForm.errors.password}
                    />
                    <Input
                      name='confirmPassword'
                      label='Confirm Password'
                      color={role || 'client'}
                      type='password'
                      value={clientCreationSecurityForm.values.confirmPassword}
                      onChange={clientCreationSecurityForm.handleChange}
                      onBlur={clientCreationSecurityForm.handleBlur}
                      error={
                        clientCreationSecurityForm.touched.confirmPassword &&
                        !!clientCreationSecurityForm.errors.confirmPassword
                      }
                      errorMessage={
                        clientCreationSecurityForm.errors.confirmPassword
                      }
                    />
                    <Box
                      marginTop='0.5rem'
                      display='flex'
                      justifyContent='flex-end'
                    >
                      <Box
                        marginRight='15px'
                        display='flex'
                        alignItems='center'
                      >
                        <Button
                          color={role || 'client'}
                          text='Previous'
                          type='submit'
                          onClick={() => setSelectedSection('general')}
                        />
                      </Box>
                      <Button
                        variant='primary-action'
                        color={role || 'client'}
                        text='Create'
                        type='submit'
                        onClick={clientCreationSecurityForm.handleSubmit}
                        loading={createUserLoading}
                        disabled={createUserLoading}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </>
        )}
        {step === 'project-metadata' && (
          <>
            {!developersLoading ? (
              <form>
                <Box>
                  <Box marginBottom='20px'>
                    <Text variant='headline' weight='bold' gutterBottom>
                      Assign frontend Developers
                    </Text>
                  </Box>
                  <Box
                    display='grid'
                    gridTemplateColumns='repeat(4, 1fr)'
                    alignItems='center'
                    columnGap='30px'
                    marginBottom='20px'
                  >
                    {developers &&
                      developers.map((developer) => (
                        <Box
                          padding='10px'
                          background='white'
                          boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                          onClick={() => {
                            if (
                              projectMetadataForm.values.frontendDevelopers &&
                              !projectMetadataForm.values.frontendDevelopers.includes(
                                developer.id
                              )
                            ) {
                              projectMetadataForm.setFieldValue(
                                'frontendDevelopers',
                                projectMetadataForm.values.frontendDevelopers.concat(
                                  developer.id
                                )
                              );
                            } else {
                              projectMetadataForm.setFieldValue(
                                'frontendDevelopers',
                                projectMetadataForm.values.frontendDevelopers &&
                                  projectMetadataForm.values.frontendDevelopers.filter(
                                    (id) => id !== developer.id
                                  )
                              );
                            }
                          }}
                          border={
                            projectMetadataForm.values.frontendDevelopers.includes(
                              developer.id
                            )
                              ? `2px solid ${
                                  theme.colors[role || 'client'].main
                                }`
                              : undefined
                          }
                          display='grid'
                          gridTemplateRows='auto'
                          alignItems='center'
                          rowGap='10px'
                          borderRadius='10px'
                          cursor='pointer'
                        >
                          <Text variant='title' weight='bold'>
                            {developer.firstName} {developer.lastName}
                          </Text>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box>
                  <Box marginBottom='20px'>
                    <Text variant='headline' weight='bold' gutterBottom>
                      Assign backend Developers
                    </Text>
                  </Box>
                  <Box
                    display='grid'
                    gridTemplateColumns='repeat(4, 1fr)'
                    alignItems='center'
                    columnGap='30px'
                    marginBottom='20px'
                  >
                    {developers &&
                      developers.map((developer) => (
                        <Box
                          padding='10px'
                          background='white'
                          boxShadow='1px 1px 10px rgba(50, 59, 105, 0.25)'
                          onClick={() => {
                            if (
                              projectMetadataForm.values.backendDevelopers &&
                              !projectMetadataForm.values.backendDevelopers.includes(
                                developer.id
                              )
                            ) {
                              projectMetadataForm.setFieldValue(
                                'backendDevelopers',
                                projectMetadataForm.values.backendDevelopers.concat(
                                  developer.id
                                )
                              );
                            } else {
                              projectMetadataForm.setFieldValue(
                                'backendDevelopers',
                                projectMetadataForm.values.backendDevelopers &&
                                  projectMetadataForm.values.backendDevelopers.filter(
                                    (id) => id !== developer.id
                                  )
                              );
                            }
                          }}
                          border={
                            projectMetadataForm.values.backendDevelopers.includes(
                              developer.id
                            )
                              ? `2px solid ${
                                  theme.colors[role || 'client'].main
                                }`
                              : undefined
                          }
                          display='grid'
                          gridTemplateRows='auto'
                          alignItems='center'
                          rowGap='10px'
                          borderRadius='10px'
                          cursor='pointer'
                        >
                          <Text variant='title' weight='bold'>
                            {developer.firstName} {developer.lastName}
                          </Text>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box>
                  <Box marginBottom='20px'>
                    <Text variant='headline' weight='bold' gutterBottom>
                      Define metadata
                    </Text>
                  </Box>
                  <Box
                    display='grid'
                    gridTemplateColumns='1fr'
                    alignItems='center'
                    rowGap='30px'
                    marginBottom='20px'
                  >
                    <TextArea
                      name='purpose'
                      label='Purpose'
                      value={projectMetadataForm.values.purpose}
                      onChange={projectMetadataForm.handleChange}
                      onBlur={projectMetadataForm.handleBlur}
                      error={
                        projectMetadataForm.touched.purpose &&
                        !!projectMetadataForm.errors.purpose
                      }
                      errorMessage={projectMetadataForm.errors.purpose}
                    />
                    <TextArea
                      name='summary'
                      label='Summary'
                      value={projectMetadataForm.values.summary}
                      onChange={projectMetadataForm.handleChange}
                      onBlur={projectMetadataForm.handleBlur}
                      error={
                        projectMetadataForm.touched.summary &&
                        !!projectMetadataForm.errors.summary
                      }
                      errorMessage={projectMetadataForm.errors.summary}
                    />
                    <Input
                      name='months'
                      label='Months'
                      value={projectMetadataForm.values.months}
                      onChange={projectMetadataForm.handleChange}
                      onBlur={projectMetadataForm.handleBlur}
                      error={
                        projectMetadataForm.touched.months &&
                        !!projectMetadataForm.errors.months
                      }
                      errorMessage={projectMetadataForm.errors.months}
                    />
                  </Box>
                </Box>
              </form>
            ) : (
              <Spinner fullScreen color={role} />
            )}
          </>
        )}
      </Box>
    </Wrapper>
  );
};

export default AddProject;
