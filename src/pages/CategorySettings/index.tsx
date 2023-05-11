import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Navigate, useNavigate, useParams } from 'react-router';
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
} from '../../components';
import { Wrapper } from './styles';
import { ArrowLeft, Empty, General } from '../../assets';
import {
  CategoryOutput,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  GetCategoryByIdQuery,
  GetCategoryByIdQueryVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
} from '../../graphql/types';
import {
  DELETE_CATEGORY,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
} from '../../graphql/category.api';

const CategorySettings = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role = useReactiveVar(roleVar);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryOutput>();

  const [deleteCategoryModal, setDeleteCategoryModal] =
    useState<boolean>(false);

  const [getCategory, { loading: categoryLoading, error: categoryError }] = useLazyQuery<
    GetCategoryByIdQuery,
    GetCategoryByIdQueryVariables
  >(GET_CATEGORY_BY_ID, {
    onCompleted({ getCategoryById }) {
      setCategory(getCategoryById);
    }
  });

  const [updateCategory, { loading }] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY, {
    onCompleted({ updateCategory: data }) {
      setCategory(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  const [deleteCategory] = useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DELETE_CATEGORY, {
    onCompleted() {
      navigate('/category');
    },
    onError({ graphQLErrors }) {
      setError(graphQLErrors[0]?.extensions?.info as string);
      setTimeout(() => setError(''), 3000);
    },
  });

  useEffect(() => {
    getCategory({ variables: { id: id as string } });
  }, [id]);

  const form = useFormik({
    initialValues: {
      name: category?.name || '',
      description: category?.description || '',
      imageName: category?.image.name || '',
      imageSource: category?.image.src || '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      imageName: Yup.string().required('Image is required'),
      imageSource: Yup.string().required('Image is required'),
    }),
    onSubmit: ({ name, description, imageName, imageSource }) => {
      updateCategory({
        variables: {
          id: id as string,
          category: {
            name,
            description,
            image: { name: imageName, src: imageSource },
          },
        },
      });
    },
    enableReinitialize: true,
  });

  if (role !== 'developer') return (
    <>
      {role === 'admin' && <Navigate to='/clients' />}
      {['client', 'productOwer'].includes(role as string) && <Navigate to='/project' />}
    </>
  )

  if (categoryLoading) return (
    <Spinner fullScreen color={role || 'client'} />
  );

  if (categoryError || !category) return (
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
      {deleteCategoryModal && (
        <Modal
          color={role || 'client'}
          title='Delete Category'
          description='
      If you delete this category you cannot recover it.'
          onClose={() => setDeleteCategoryModal(false)}
          onConfirm={() => deleteCategory({ variables: { id: id as string } })}
        ></Modal>
      )}
      <Box>
        <Button
          text='Back'
          color={role || 'client'}
          size='small'
          onClick={() => navigate(-1)}
          iconLeft={<ArrowLeft />}
        />
        <Text variant='headline' weight='bold'>
          Update Category
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
            {success && (
              <Alert color='success' text='Category updated successfully' />
            )}
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

                      form.setFieldValue('imageName', '');
                      form.setFieldValue('imageSource', '');

                      const data = await (
                        await fetch(`${import.meta.env.VITE_CLOUDINARY_URL}`, {
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
                  error={
                    form.touched.imageName &&
                    (!!form.errors.imageName || !!form.errors.imageSource)
                  }
                  errorMessage={form.errors.imageName}
                />
                <TextArea
                  name='description'
                  label='Description'
                  color={role || 'client'}
                  value={form.values.description}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={form.touched.description && !!form.errors.description}
                  errorMessage={form.errors.description}
                />
                <Box
                  marginTop='0.5rem'
                  display='flex'
                  justifyContent='space-between'
                >
                  <Button
                    variant='text'
                    color='error'
                    text='Delete Category'
                    onClick={() => setDeleteCategoryModal(true)}
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
        </Box>
      </Box>
    </Wrapper>
  );
};

export default CategorySettings;
