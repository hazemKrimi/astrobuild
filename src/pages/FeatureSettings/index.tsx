import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Redirect, useHistory, useParams } from 'react-router';
import { useLazyQuery, useMutation, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { roleVar } from '../../graphql/state';
import {
  Box,
  Button,
  Text,
  SectionSelector,
  Input,
  Alert,
  TextArea,
  Spinner,
  Modal,
  CheckBox,
  ImagePreview,
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, Design, General } from '../../assets';
import {
  DeleteFeatureMutation,
  DeleteFeatureMutationVariables,
  FeatureOutput,
  GetFeatureByIdQuery,
  GetFeatureByIdQueryVariables,
  UpdateFeatureMutation,
  UpdateFeatureMutationVariables,
} from '../../graphql/types';
import {
  DELETE_FEATURE,
  GET_FEATURE_BY_ID,
  UPDATE_FEATURE,
} from '../../graphql/feature.api';

const FeatureSettings = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const role = useReactiveVar(roleVar);

  const [selectedSection, setSelectedSection] = useState<
    'general' | 'wireframes'
  >('general');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [feature, setFeature] = useState<FeatureOutput>({
    id,
    name: '',
    description: '',
    featureType: '',
    image: {
      name: '',
      src: '',
    },
    price: 0,
    repo: '',
  });

  const [deleteFeatureModal, setDeleteFeatureModal] = useState<boolean>(false);

  const [getFeature, { loading: featureLoading }] = useLazyQuery<
    GetFeatureByIdQuery,
    GetFeatureByIdQueryVariables
  >(GET_FEATURE_BY_ID, {
    onCompleted({ getFeatureById }) {
      setFeature(getFeatureById);
    },
    fetchPolicy: 'network-only',
  });

  const [updateFeature, { loading }] = useMutation<
    UpdateFeatureMutation,
    UpdateFeatureMutationVariables
  >(UPDATE_FEATURE, {
    onCompleted({ updateFeature: data }) {
      setFeature(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [deleteFeature] = useMutation<
    DeleteFeatureMutation,
    DeleteFeatureMutationVariables
  >(DELETE_FEATURE, {
    onCompleted() {
      history.push('/feature');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  useEffect(() => {
    getFeature({ variables: { id } });

    // eslint-disable-next-line
  }, [id]);

  const generalForm = useFormik({
    initialValues: {
      name: feature?.name || '',
      description: feature?.description || '',
      imageName: feature?.image.name || '',
      imageSource: feature?.image.src || '',
      featureType: feature?.featureType || '',
      price: feature?.price.toString() || '',
      repo: feature?.repo || '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
      featureType: Yup.string().required('Feature Type is required'),
      // prettier-ignore
      price: Yup.number().typeError('Price must be a number').required('Price is required'),
      repo: Yup.string().required('Repo is required'),
    }),
    onSubmit: ({
      name,
      description,
      imageName,
      imageSource,
      featureType,
      price,
      repo,
    }) => {
      updateFeature({
        variables: {
          id,
          feature: {
            name,
            description,
            featureType,
            image: { name: imageName, src: imageSource },
            price: parseFloat(price),
            repo,
          },
        },
      });
    },
    enableReinitialize: true,
  });

  const wireframesForm = useFormik<{
    wireframes: Array<{ name: string; src: string }>;
  }>({
    initialValues: {
      wireframes:
        feature?.wireframes?.map((wireframe) => ({
          name: wireframe.name,
          src: wireframe.src,
        })) || [],
    },
    onSubmit: ({ wireframes }) => {
      updateFeature({
        variables: {
          id,
          feature: {
            name: feature.name,
            description: feature.description,
            price: feature.price,
            repo: feature.repo,
            featureType: feature.featureType,
            image: { name: feature.image.name, src: feature.image.src },
            wireframes,
          },
        },
      });
    },
    enableReinitialize: true,
  });

  return role === 'developer' ? (
    <Wrapper>
      <Box>
        <Button
          text='Back'
          color={role || 'client'}
          size='small'
          onClick={() => history.goBack()}
          iconLeft={<ArrowLeft />}
        />
        <Text variant='headline' weight='bold'>
          Update Feature
        </Text>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns='0.5fr 2fr'
        columnGap='25px'
        marginTop='1rem'
      >
        <Box display='grid' rowGap='0.5rem' gridTemplateRows='50px'>
          <SectionSelector
            icon={<General />}
            color={role || 'client'}
            text='General'
            selected={selectedSection === 'general'}
            onClick={() => setSelectedSection('general')}
          />
          <SectionSelector
            icon={<Design />}
            color={role || 'client'}
            text='Wireframes'
            selected={selectedSection === 'wireframes'}
            onClick={() => setSelectedSection('wireframes')}
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
              {selectedSection === 'general' ? 'General' : 'Wireframes'}
            </Text>
            {error && <Alert color='error' text={error} />}
            {success && (
              <Alert color='success' text='Feature updated successfully' />
            )}
          </Box>
          {selectedSection === 'general' && (
            <>
              {!featureLoading ? (
                <>
                  {deleteFeatureModal && (
                    <Modal
                      color={role || 'client'}
                      title='Delete Feature'
                      description='
              If you delete this feature you cannot recover it.'
                      onClose={() => setDeleteFeatureModal(false)}
                      onConfirm={() => deleteFeature({ variables: { id } })}
                    ></Modal>
                  )}
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
                                `${process.env.REACT_APP_CLOUDINARY_URL}`,
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
                      <Box>
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                          justifyContent='space-between'
                        >
                          <Box justifySelf='flex-start'>
                            <Text
                              variant='body'
                              weight='bold'
                              className='feature-type'
                            >
                              Type
                            </Text>
                          </Box>
                          {!!generalForm.errors.featureType && (
                            <Box justifySelf='flex-end'>
                              <Text variant='body' color='error'>
                                {generalForm.errors.featureType}
                              </Text>
                            </Box>
                          )}
                        </Box>
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                          marginTop='5px'
                        >
                          <Box marginRight='50px'>
                            <CheckBox
                              label='Frontend'
                              name='featureType'
                              color={role || 'client'}
                              onClick={() => {
                                if (
                                  generalForm.values.featureType === 'fullstack'
                                ) {
                                  generalForm.setFieldValue(
                                    'featureType',
                                    'backend'
                                  );
                                  return;
                                }
                                if (
                                  generalForm.values.featureType === 'backend'
                                ) {
                                  generalForm.setFieldValue(
                                    'featureType',
                                    'fullstack'
                                  );
                                  return;
                                }
                                if (
                                  generalForm.values.featureType === 'frontend'
                                ) {
                                  generalForm.setFieldValue('featureType', '');
                                  return;
                                }
                                generalForm.setFieldValue(
                                  'featureType',
                                  'frontend'
                                );
                              }}
                              checked={
                                generalForm.values.featureType === 'frontend' ||
                                generalForm.values.featureType === 'fullstack'
                              }
                            />
                          </Box>
                          <Box>
                            <CheckBox
                              label='Backend'
                              name='featureType'
                              color={role || 'client'}
                              onClick={() => {
                                if (
                                  generalForm.values.featureType === 'fullstack'
                                ) {
                                  generalForm.setFieldValue(
                                    'featureType',
                                    'frontend'
                                  );
                                  return;
                                }
                                if (
                                  generalForm.values.featureType === 'frontend'
                                ) {
                                  generalForm.setFieldValue(
                                    'featureType',
                                    'fullstack'
                                  );
                                  return;
                                }
                                if (
                                  generalForm.values.featureType === 'backend'
                                ) {
                                  generalForm.setFieldValue('featureType', '');
                                  return;
                                }
                                generalForm.setFieldValue(
                                  'featureType',
                                  'backend'
                                );
                              }}
                              checked={
                                generalForm.values.featureType === 'backend' ||
                                generalForm.values.featureType === 'fullstack'
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
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
                      <Input
                        name='price'
                        label='Price'
                        color={role || 'client'}
                        value={generalForm.values.price}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        error={
                          generalForm.touched.price &&
                          !!generalForm.errors.price
                        }
                        errorMessage={generalForm.errors.price}
                      />
                      <Input
                        name='repo'
                        label='Repo'
                        color={role || 'client'}
                        value={generalForm.values.repo}
                        onChange={generalForm.handleChange}
                        onBlur={generalForm.handleBlur}
                        error={
                          generalForm.touched.repo && !!generalForm.errors.repo
                        }
                        errorMessage={generalForm.errors.repo}
                      />
                      <Box
                        marginTop='0.5rem'
                        display='flex'
                        justifyContent='space-between'
                      >
                        <Button
                          variant='text'
                          color='error'
                          text='Delete Feature'
                          onClick={() => setDeleteFeatureModal(true)}
                        />
                        <Button
                          variant='primary-action'
                          color={role || 'client'}
                          text='Save'
                          type='submit'
                          loading={loading}
                          disabled={loading}
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
          {selectedSection === 'wireframes' && (
            <form onSubmit={wireframesForm.handleSubmit}>
              <Box
                display='grid'
                gridTemplate='auto / repeat(auto-fit, 175px)'
                gap='30px'
                alignItems='stretch'
              >
                <ImagePreview
                  color={role}
                  image={undefined}
                  onChange={async (
                    event: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const formData = new FormData();

                    if (event.target.files && event.target.files[0]) {
                      formData.append('file', event.target.files[0]);
                      formData.append('upload_preset', 'xofll5kc');

                      const data = await (
                        await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
                          method: 'POST',
                          body: formData,
                        })
                      ).json();

                      const filename = data.original_filename;
                      const filesource = data.secure_url;

                      wireframesForm.setFieldValue('wireframes', [
                        ...wireframesForm.values.wireframes,
                        { name: filename, src: filesource },
                      ]);
                    }
                  }}
                />
                {wireframesForm.values.wireframes.map((image) => (
                  <ImagePreview
                    key={image.name}
                    color={role}
                    image={image}
                    deletable
                    onDelete={() => {
                      wireframesForm.setFieldValue(
                        'wireframes',
                        wireframesForm.values.wireframes.filter(
                          ({ name }) => name !== image.name
                        )
                      );
                    }}
                  />
                ))}
              </Box>
              <Box marginTop='1rem' display='flex' justifyContent='flex-end'>
                <Button
                  variant='primary-action'
                  color={role || 'client'}
                  text='Save'
                  type='submit'
                  loading={loading}
                />
              </Box>
            </form>
          )}
        </Box>
      </Box>
    </Wrapper>
  ) : (
    <>
      {role === 'admin' && <Redirect to='/clients' />}
      {role === 'client' ||
        (role === 'productOwner' && <Redirect to='/project' />)}
    </>
  );
};

export default FeatureSettings;
