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
  Spinner,
  TemplateCard,
  Text,
} from '../../components';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '../../assets';
import {
  AddProjectMutation,
  AddProjectMutationVariables,
  CategoryOutput,
  DelivrableInput,
  FeatureOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  GetAllTemplatesByCategoriesIdQuery,
  GetAllTemplatesByCategoriesIdQueryVariables,
  PaymentOptionInput,
  ProjectInput,
  TemplateOutput,
} from '../../graphql/types';
import { theme } from '../../themes';
import { GET_ALL_CATEGORIES } from '../../graphql/category.api';
import { GET_ALL_TEMPLATES_BY_CATEGORIES_ID } from '../../graphql/template.api';
import { GET_ALL_FEATURES } from '../../graphql/feature.api';
import { ADD_PROJECT } from '../../graphql/project.api';

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
  const [, setChosenPaymentOption] = useState<PaymentOptionInput>();
  const [chosenPlatforms, setChosenPlatforms] = useState<Array<string>>([]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureOutput>();
  const [categories, setCategories] = useState<Array<CategoryOutput>>([]);
  const [templates, setTemplates] = useState<Array<TemplateOutput>>([]);
  const [features, setFeatures] = useState<Array<FeatureOutput>>([]);

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

  const [addProject, { loading: addProjectLoading }] = useMutation<
    AddProjectMutation,
    AddProjectMutationVariables
  >(ADD_PROJECT, {
    onCompleted({ addProject: projectData }) {
      history.push(`/project/${projectData.id}`);
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
                loading={addProjectLoading}
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
      </Box>
    </Wrapper>
  );
};

export default AddProject;
