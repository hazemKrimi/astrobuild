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
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, General } from '../../assets';
import {
  AddCategoryMutation,
  AddCategoryMutationVariables,
} from '../../graphql/types';
import { ADD_CATEGORY } from '../../graphql/category.api';

const AddCategory = () => {
  const history = useHistory();
  const role = useReactiveVar(roleVar);

  const [error, setError] = useState<string>('');

  const [addCategory, { loading }] = useMutation<
    AddCategoryMutation,
    AddCategoryMutationVariables
  >(ADD_CATEGORY, {
    onCompleted({ addCategory: { id } }) {
      history.push(`/category/${id}`);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info);
      setTimeout(() => setError(''), 3000);
    },
  });

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      imageName: '',
      imageSource: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
    }),
    onSubmit: ({ name, description, imageName, imageSource }) => {
      addCategory({
        variables: {
          category: {
            name,
            description,
            image: { name: imageName, src: imageSource },
          },
        },
      });
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
          Add Category
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
            selected
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
              General
            </Text>
            {error && <Alert color='error' text={error} />}
          </Box>
          <form onSubmit={form.handleSubmit}>
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
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.name && !!form.errors.name}
                errorMessage={form.errors.name}
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

                    const data = await (
                      await fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
                        method: 'POST',
                        body: formData,
                      })
                    ).json();

                    const filename = data.original_filename;
                    const filesource = data.secure_url;

                    form.setFieldValue('imageName', filename);
                    form.setFieldValue('imageSource', filesource);
                  }
                }}
                error={!!form.errors.imageName || !!form.errors.imageSource}
                errorMessage={form.errors.imageName}
              />
              <TextArea
                name='description'
                label='Description'
                color={role || 'client'}
                value={form.values.description}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <Box marginTop='0.5rem' display='flex' justifyContent='flex-end'>
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

export default AddCategory;
