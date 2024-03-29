import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router';
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import React, { useState } from 'react';
import { roleVar } from '../../graphql/state';
import {
  Box,
  Button,
  Text,
  SectionSelector,
  Input,
  Alert,
  TextArea,
  Select,
  Spinner,
  FeatureCard,
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, General, Specification, Features, Empty } from '../../assets';
import {
  AddTemplateMutation,
  AddTemplateMutationVariables,
  FeatureOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllFeaturesQuery,
  GetAllFeaturesQueryVariables,
  TemplateInput,
} from '../../graphql/types';
import { ADD_TEMPLATE } from '../../graphql/template.api';
import { GET_ALL_CATEGORIES } from '../../graphql/category.api';
import { GET_ALL_FEATURES } from '../../graphql/feature.api';

const AddTemplate = () => {
  const navigate = useNavigate();
  const role = useReactiveVar(roleVar);
  const [newTemplate, setNewTemplate] = useState<TemplateInput>({
    name: '',
    description: '',
    image: {
      name: '',
      src: '',
    },
    category: '',
    specification: {
      introduction: {
        purpose: '',
        documentConventions: '',
        intendedAudience: '',
        projectScope: '',
      },
      overallDescription: {
        perspective: '',
        userCharacteristics: '',
        operatingEnvironment: '',
        designImplementationConstraints: '',
        userDocumentation: '',
        assemptionsDependencies: '',
      },
      nonFunctionalRequirements: {
        performanceRequirements: '',
        safetyRequirements: '',
        securityRequirements: '',
        softwareQualityAttributes: '',
      },
      otherRequirements: '',
      glossary: '',
      analysisModels: '',
      issuesList: '',
    },
    features: [],
  });

  const [availableFeatures, setAvailableFeatures] =
    useState<Array<FeatureOutput>>();

  const [selectedSection, setSelectedSection] = useState<
    'general' | 'specification' | 'features'
  >('general');
  const [error, setError] = useState<string>('');

  const { data: categories, loading: categoriesLoading, error: categoriesError } = useQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES);

  const [getFeatures, { loading: featuresLoading, error: featuresError }] = useLazyQuery<
    GetAllFeaturesQuery,
    GetAllFeaturesQueryVariables
  >(GET_ALL_FEATURES, {
    onCompleted({ getAllFeatures }) {
      setAvailableFeatures(getAllFeatures);
    }
  });

  const [addTemplate, { loading }] = useMutation<
    AddTemplateMutation,
    AddTemplateMutationVariables
  >(ADD_TEMPLATE, {
    onCompleted({ addTemplate: { id } }) {
      navigate(`/template/${id}`);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const generalForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageName: '',
      imageSource: '',
      category: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: ({ name, description, category, imageName, imageSource }) => {
      setNewTemplate({
        name,
        description,
        image: { name: imageName, src: imageSource },
        category,
      });
      setSelectedSection('specification');
    },
  });

  const specificationForm = useFormik({
    initialValues: {
      purpose: '',
      documentConventions: '',
      intendedAudience: '',
      projectScope: '',
      perspective: '',
      userCharacteristics: '',
      operatingEnvironment: '',
      designImplementationConstraints: '',
      userDocumentation: '',
      assemptionsDependencies: '',
      performanceRequirements: '',
      safetyRequirements: '',
      securityRequirements: '',
      softwareQualityAttributes: '',
      otherRequirements: '',
      glossary: '',
      analysisModels: '',
      issuesList: '',
    },
    validationSchema: Yup.object().shape({
      purpose: Yup.string().required('Purpose is required'),
      documentConventions: Yup.string().required(
        'Document conventions is required'
      ),
      intendedAudience: Yup.string().required('Intented audience is required'),
      projectScope: Yup.string().required('Project scope is required'),
      perspective: Yup.string().required('Perspective is required'),
      userCharacteristics: Yup.string().required(
        'User characteristics is required'
      ),
      operatingEnvironment: Yup.string().required(
        'Operating environment is required'
      ),
      designImplementationConstraints: Yup.string().required(
        'Design and implementation constraints is required'
      ),
      userDocumentation: Yup.string().required(
        'User documentation is required'
      ),
      assemptionsDependencies: Yup.string().required(
        'Assumptions and dependencies is required'
      ),
      performanceRequirements: Yup.string().required(
        'Performance requirements is required'
      ),
      safetyRequirements: Yup.string().required(
        'Safety requirements is required'
      ),
      securityRequirements: Yup.string().required(
        'Security requirements is required'
      ),
      softwareQualityAttributes: Yup.string().required(
        'Software quality attributes is required'
      ),
      otherRequirements: Yup.string().required(
        'Other requirements is required'
      ),
      glossary: Yup.string().required('Glossary is required'),
      analysisModels: Yup.string().required('Analysis models is required'),
      issuesList: Yup.string().required('Issues list is required'),
    }),
    onSubmit: ({
      purpose,
      documentConventions,
      intendedAudience,
      projectScope,
      perspective,
      userCharacteristics,
      operatingEnvironment,
      designImplementationConstraints,
      userDocumentation,
      assemptionsDependencies,
      performanceRequirements,
      safetyRequirements,
      securityRequirements,
      softwareQualityAttributes,
      otherRequirements,
      glossary,
      analysisModels,
      issuesList,
    }) => {
      setNewTemplate({
        ...newTemplate,
        specification: {
          introduction: {
            purpose,
            documentConventions,
            intendedAudience,
            projectScope,
          },
          overallDescription: {
            perspective,
            userCharacteristics,
            operatingEnvironment,
            designImplementationConstraints,
            userDocumentation,
            assemptionsDependencies,
          },
          nonFunctionalRequirements: {
            performanceRequirements,
            safetyRequirements,
            securityRequirements,
            softwareQualityAttributes,
          },
          otherRequirements,
          glossary,
          analysisModels,
          issuesList,
        },
      });
      setSelectedSection('features');
      getFeatures();
    },
  });

  const featuresForm = useFormik<{ features: Array<string> }>({
    initialValues: {
      features: [],
    },
    onSubmit: ({ features }) => {
      addTemplate({ variables: { template: { ...newTemplate, features } } });
    },
  });

  if (role !== 'productOwner') return (
    <>
      {role === 'admin' && <Navigate to='/clients' />}
      {['client', 'developer'].includes(role as string) && <Navigate to='/project' />}
    </>
  );

  if (categoriesLoading || featuresLoading) return (
    <Spinner fullScreen color={role || 'client'} />
  );

  if (categoriesError || featuresError || !categories) return (
    <Wrapper color={role}>
      <Box
        width='100%'
        height='100vh'
        display='grid'
        alignItems='center'
        justifyContent='center'
      >
        <Box>
          <Empty />
        </Box>
      </Box>
    </Wrapper>
  );

  return (
    <Wrapper>
      <Box>
        <Button
          text='Back'
          color={role || 'client'}
          size='small'
          onClick={() => navigate(-1)}
          iconLeft={<ArrowLeft />}
        />
        <Text variant='headline' weight='bold'>
          Add Template
        </Text>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='0.5fr 2fr'
        columnGap='25px'
        marginTop='1rem'
      >
        <Box display='grid' rowGap='0.5rem' gridTemplateRows='repeat(3, 50px)'>
          <SectionSelector
            icon={<General />}
            color={role || 'client'}
            text='General'
            selected={selectedSection === 'general'}
          />
          <SectionSelector
            icon={<Specification />}
            color={role || 'client'}
            text='Specification'
            selected={selectedSection === 'specification'}
          />
          <SectionSelector
            icon={<Features />}
            color={role || 'client'}
            text='Features'
            selected={selectedSection === 'features'}
          />
        </Box>
        <Box
          background='white'
          boxShadow='1px 1px 10px 0px rgba(50, 59, 105, 0.25)'
          borderRadius='10px'
          width='100%'
          padding='30px'
        >
          {selectedSection === 'general' && (
            <>
              {!categoriesLoading ? (
                <>
                  <Box
                    display='grid'
                    gridTemplateColumns='auto 1fr'
                    columnGap='1rem'
                    alignItems='center'
                    marginBottom='50px'
                  >
                    <Text variant='subheader' weight='bold'>
                      {selectedSection === 'general' ? 'General' : 'Wireframes'}
                    </Text>
                    {error && <Alert color='error' text={error} />}
                  </Box>
                  <form onSubmit={generalForm.handleSubmit}>
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
                        value={generalForm.values.name}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        error={
                          generalForm.touched.name && !!generalForm.errors.name
                        }
                        errorMessage={generalForm.errors.name}
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

                            generalForm.setFieldValue('imageName', '');
                            generalForm.setFieldValue('imageSource', '');

                            const data = await (
                              await fetch(
                                `${import.meta.env.VITE_CLOUDINARY_URL}`,
                                {
                                  method: 'POST',
                                  body: formData,
                                }
                              )
                            ).json();

                            const filename = data.original_filename;
                            const filesource = data.secure_url;

                            generalForm.setFieldValue('imageName', filename);
                            generalForm.setFieldValue(
                              'imageSource',
                              filesource
                            );
                          }
                        }}
                        error={
                          generalForm.touched.imageName &&
                          (!!generalForm.errors.imageName ||
                            !!generalForm.errors.imageSource)
                        }
                        errorMessage={generalForm.errors.imageName}
                      />
                      <Select
                        name='category'
                        label='Category'
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        value={generalForm.values.category}
                        select={generalForm.values.category}
                        options={
                          categories?.getAllCategories
                            ? categories.getAllCategories.map(
                                ({ id, name }) => ({
                                  value: id,
                                  label: name,
                                })
                              )
                            : [{ value: '', label: 'Default' }]
                        }
                        error={
                          generalForm.touched.category &&
                          !!generalForm.errors.category
                        }
                        errorMessage={generalForm.errors.category}
                      />
                      <TextArea
                        name='description'
                        label='Description'
                        color={role || 'client'}
                        value={generalForm.values.description}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        error={
                          generalForm.touched.description &&
                          !!generalForm.errors.description
                        }
                        errorMessage={generalForm.errors.description}
                      />
                      <Box
                        marginTop='0.5rem'
                        display='flex'
                        justifyContent='flex-end'
                      >
                        <Button
                          variant='primary-action'
                          color={role || 'client'}
                          text='Next'
                          type='submit'
                        />
                      </Box>
                    </Box>
                  </form>
                </>
              ) : (
                <Box display='grid' alignItems='center' justifyContent='center'>
                  <Spinner color={role || 'client'} />
                </Box>
              )}
            </>
          )}
          {selectedSection === 'specification' && (
            <>
              <Box
                display='grid'
                gridTemplateColumns='auto 1fr'
                columnGap='1rem'
                alignItems='center'
                marginBottom='50px'
              >
                <Text variant='subheader' weight='bold'>
                  Specification
                </Text>
                {error && <Alert color='error' text={error} />}
              </Box>
              <form onSubmit={specificationForm.handleSubmit}>
                <Box display='grid' gridTemplateColumns='auto' rowGap='0.5rem'>
                  <Text variant='headline' gutterBottom>
                    Introduction
                  </Text>
                  <TextArea
                    name='purpose'
                    label='Purpose'
                    color={role || 'client'}
                    value={specificationForm.values.purpose}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.purpose &&
                      !!specificationForm.errors.purpose
                    }
                    errorMessage={specificationForm.errors.purpose}
                  />
                  <TextArea
                    name='documentConventions'
                    label='Document Conventions'
                    color={role || 'client'}
                    value={specificationForm.values.documentConventions}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.documentConventions &&
                      !!specificationForm.errors.documentConventions
                    }
                    errorMessage={specificationForm.errors.documentConventions}
                  />
                  <TextArea
                    name='intendedAudience'
                    label='Intended Audience'
                    color={role || 'client'}
                    value={specificationForm.values.intendedAudience}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.intendedAudience &&
                      !!specificationForm.errors.intendedAudience
                    }
                    errorMessage={specificationForm.errors.intendedAudience}
                  />
                  <TextArea
                    name='projectScope'
                    label='Project Scope'
                    color={role || 'client'}
                    value={specificationForm.values.projectScope}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.projectScope &&
                      !!specificationForm.errors.projectScope
                    }
                    errorMessage={specificationForm.errors.projectScope}
                  />
                  <Text variant='headline' gutterBottom>
                    Overall Description
                  </Text>
                  <TextArea
                    name='perspective'
                    label='Perspective'
                    color={role || 'client'}
                    value={specificationForm.values.perspective}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.perspective &&
                      !!specificationForm.errors.perspective
                    }
                    errorMessage={specificationForm.errors.perspective}
                  />
                  <TextArea
                    name='userCharacteristics'
                    label='User Characteristics'
                    color={role || 'client'}
                    value={specificationForm.values.userCharacteristics}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.userCharacteristics &&
                      !!specificationForm.errors.userCharacteristics
                    }
                    errorMessage={specificationForm.errors.userCharacteristics}
                  />
                  <TextArea
                    name='operatingEnvironment'
                    label='Operating Environment'
                    color={role || 'client'}
                    value={specificationForm.values.operatingEnvironment}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.operatingEnvironment &&
                      !!specificationForm.errors.operatingEnvironment
                    }
                    errorMessage={specificationForm.errors.operatingEnvironment}
                  />
                  <TextArea
                    name='designImplementationConstraints'
                    label='Design and Implementation Constraints'
                    color={role || 'client'}
                    value={
                      specificationForm.values.designImplementationConstraints
                    }
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched
                        .designImplementationConstraints &&
                      !!specificationForm.errors.designImplementationConstraints
                    }
                    errorMessage={
                      specificationForm.errors.designImplementationConstraints
                    }
                  />
                  <TextArea
                    name='userDocumentation'
                    label='User Documentation'
                    color={role || 'client'}
                    value={specificationForm.values.userDocumentation}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.userDocumentation &&
                      !!specificationForm.errors.userDocumentation
                    }
                    errorMessage={specificationForm.errors.userDocumentation}
                  />
                  <TextArea
                    name='assemptionsDependencies'
                    label='Assumptions and Dependencies'
                    color={role || 'client'}
                    value={specificationForm.values.assemptionsDependencies}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.assemptionsDependencies &&
                      !!specificationForm.errors.assemptionsDependencies
                    }
                    errorMessage={
                      specificationForm.errors.assemptionsDependencies
                    }
                  />
                  <Text variant='headline' gutterBottom>
                    Non-Functional Requirements
                  </Text>
                  <TextArea
                    name='performanceRequirements'
                    label='Performance Requirements'
                    color={role || 'client'}
                    value={specificationForm.values.performanceRequirements}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.performanceRequirements &&
                      !!specificationForm.errors.performanceRequirements
                    }
                    errorMessage={
                      specificationForm.errors.performanceRequirements
                    }
                  />
                  <TextArea
                    name='safetyRequirements'
                    label='Safety Requirements'
                    color={role || 'client'}
                    value={specificationForm.values.safetyRequirements}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.safetyRequirements &&
                      !!specificationForm.errors.safetyRequirements
                    }
                    errorMessage={specificationForm.errors.safetyRequirements}
                  />
                  <TextArea
                    name='securityRequirements'
                    label='Security Requirements'
                    color={role || 'client'}
                    value={specificationForm.values.securityRequirements}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.securityRequirements &&
                      !!specificationForm.errors.securityRequirements
                    }
                    errorMessage={specificationForm.errors.securityRequirements}
                  />
                  <TextArea
                    name='softwareQualityAttributes'
                    label='Software Quality Attributes'
                    color={role || 'client'}
                    value={specificationForm.values.softwareQualityAttributes}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.softwareQualityAttributes &&
                      !!specificationForm.errors.softwareQualityAttributes
                    }
                    errorMessage={
                      specificationForm.errors.softwareQualityAttributes
                    }
                  />
                  <TextArea
                    name='otherRequirements'
                    label='Other Requirements'
                    color={role || 'client'}
                    value={specificationForm.values.otherRequirements}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.otherRequirements &&
                      !!specificationForm.errors.otherRequirements
                    }
                    errorMessage={specificationForm.errors.otherRequirements}
                  />
                  <TextArea
                    name='glossary'
                    label='Glossary'
                    color={role || 'client'}
                    value={specificationForm.values.glossary}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.glossary &&
                      !!specificationForm.errors.glossary
                    }
                    errorMessage={specificationForm.errors.glossary}
                  />
                  <TextArea
                    name='analysisModels'
                    label='Analysis Models'
                    color={role || 'client'}
                    value={specificationForm.values.analysisModels}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.analysisModels &&
                      !!specificationForm.errors.analysisModels
                    }
                    errorMessage={specificationForm.errors.analysisModels}
                  />
                  <TextArea
                    name='issuesList'
                    label='Issues List'
                    color={role || 'client'}
                    value={specificationForm.values.issuesList}
                    onChange={specificationForm.handleChange}
                    onBlur={specificationForm.handleBlur}
                    error={
                      specificationForm.touched.issuesList &&
                      !!specificationForm.errors.issuesList
                    }
                    errorMessage={specificationForm.errors.issuesList}
                  />
                </Box>
                <Box marginTop='1rem' display='flex' justifyContent='flex-end'>
                  <Button
                    variant='primary-action'
                    color={role || 'client'}
                    text='Next'
                    type='submit'
                  />
                </Box>
              </form>
            </>
          )}
          {selectedSection === 'features' && (
            <>
              <Box
                display='grid'
                gridTemplateColumns='auto 1fr'
                columnGap='1rem'
                alignItems='center'
                marginBottom='50px'
              >
                <Text variant='subheader' weight='bold'>
                  Features
                </Text>
                {error && <Alert color='error' text={error} />}
              </Box>
              <form onSubmit={featuresForm.handleSubmit}>
                <Box
                  display='grid'
                  gridTemplateColumns='repeat(2, 1fr)'
                  columnGap='40px'
                  rowGap='45px'
                  alignItems='stretch'
                >
                  {availableFeatures &&
                    availableFeatures.map((feature) => (
                      <FeatureCard
                        feature={feature}
                        selectable
                        selected={featuresForm.values.features.includes(
                          feature.id
                        )}
                        toggleSelect={() => {
                          if (
                            !featuresForm.values.features.includes(
                              feature.id
                            )
                          ) {
                            featuresForm.setFieldValue('features', [
                              ...featuresForm.values.features,
                              feature.id,
                            ]);
                          } else {
                            featuresForm.setFieldValue(
                              'features',
                              featuresForm.values.features.filter(
                                (id) => id !== feature.id
                              )
                            );
                          }
                        }}
                      />
                    ))}
                </Box>
                <Box
                  marginTop='1rem'
                  display='flex'
                  justifyContent='flex-end'
                >
                  <Button
                    variant='primary-action'
                    color={role || 'client'}
                    text='Save'
                    type='submit'
                    loading={loading}
                  />
                </Box>
              </form>
            </>
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default AddTemplate;
