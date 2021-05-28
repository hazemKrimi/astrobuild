import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router';
import { useMutation, useReactiveVar } from '@apollo/client';
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
  CheckBox,
  ImagePreview,
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, General, Design } from '../../assets';
import {
  AddFeatureMutation,
  AddFeatureMutationVariables,
} from '../../graphql/types';
import { ADD_FEATURE } from '../../graphql/feature.api';

const AddFeature = () => {
  const history = useHistory();
  const role = useReactiveVar(roleVar);
  const [newFeature, setNewFeature] = useState<{
    name: string;
    description: string;
    featureType: string;
    image: {
      name: string;
      src: string;
    };
    wireframes?: Array<{
      name: string;
      src: string;
    }>;
    price: number;
    repo: string;
  }>({
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

  const [selectedSection, setSelectedSection] = useState<
    'general' | 'wireframes'
  >('general');
  const [error, setError] = useState<string>('');

  const [addFeature, { loading }] = useMutation<
    AddFeatureMutation,
    AddFeatureMutationVariables
  >(ADD_FEATURE, {
    onCompleted({ addFeature: { id } }) {
      history.push(`/feature/${id}`);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const generalForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageName: '',
      imageSource: '',
      featureType: '',
      price: '',
      repo: '',
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
      setNewFeature({
        name,
        description,
        featureType,
        image: { name: imageName, src: imageSource },
        price: parseFloat(price),
        repo,
      });
      setSelectedSection('wireframes');
    },
  });

  const wireframesForm = useFormik<{
    wireframes: Array<{ name: string; src: string }>;
  }>({
    initialValues: {
      wireframes: [],
    },
    onSubmit: ({ wireframes }) => {
      addFeature({ variables: { feature: { ...newFeature, wireframes } } });
    },
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
          Add Feature
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
          />
          <SectionSelector
            icon={<Design />}
            color={role || 'client'}
            text='Wireframes'
            selected={selectedSection === 'wireframes'}
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
                        generalForm.setFieldValue('imageSource', filesource);
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
                      {!!generalForm.touched.featureType &&
                        generalForm.errors.featureType && (
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
                            if (generalForm.values.featureType === 'backend') {
                              generalForm.setFieldValue(
                                'featureType',
                                'fullstack'
                              );
                              return;
                            }
                            if (generalForm.values.featureType === 'frontend') {
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
                            if (generalForm.values.featureType === 'frontend') {
                              generalForm.setFieldValue(
                                'featureType',
                                'fullstack'
                              );
                              return;
                            }
                            if (generalForm.values.featureType === 'backend') {
                              generalForm.setFieldValue('featureType', '');
                              return;
                            }
                            generalForm.setFieldValue('featureType', 'backend');
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
                      generalForm.touched.price && !!generalForm.errors.price
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
          )}
          {selectedSection === 'wireframes' && (
            <>
              <Box
                display='grid'
                gridTemplateColumns='auto 1fr'
                columnGap='1rem'
                alignItems='center'
                marginBottom='50px'
              >
                <Text variant='subheader' weight='bold'>
                  Wireframes
                </Text>
                {error && <Alert color='error' text={error} />}
              </Box>
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
            </>
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

export default AddFeature;
