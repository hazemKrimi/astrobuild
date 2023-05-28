import { useEffect, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Navigate, useNavigate, useParams } from 'react-router';
import { roleVar } from '../../graphql/state';
import { Empty, Settings } from '../../assets';
import { Box, Button, Spinner, Text } from '../../components';
import { Wrapper } from './styles';
import {
  CategoryOutput,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetCategoryByIdQuery,
  GetCategoryByIdQueryVariables,
} from '../../graphql/types';
import {
  GET_ALL_CATEGORIES,
  GET_CATEGORY_BY_ID,
} from '../../graphql/category.api';

const Category = () => {
  const role = useReactiveVar(roleVar);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<CategoryOutput>();

  const [getCategories, { loading: categoriesLoading, error: categoriesError }] = useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategory(getAllCategories[0]);
    }
  });

  const [getCategory, { loading: categoryLoading, error: categoryError }] = useLazyQuery<
    GetCategoryByIdQuery,
    GetCategoryByIdQueryVariables
  >(GET_CATEGORY_BY_ID, {
    onCompleted({ getCategoryById }) {
      setCategory(getCategoryById);
    }
  });

  useEffect(() => {
    if (id) {
      getCategory({ variables: { id } });
    } else {
      getCategories();
    }
  }, [id]);

  if (role !== 'developer') return (
    <>
      {role === 'admin' && <Navigate to='/clients' />}
      {['client', 'productOwer'].includes(role as string) && <Navigate to='/project' />}
    </>
  )

  if (categoriesLoading || categoryLoading) return (
    <Spinner fullScreen color={role || 'client'} />
  );

  if (categoriesError || categoryError || !category) return (
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
      <Box padding='35px 45px 0px 120px'>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          marginBottom='20px'
        >
          <Box flexGrow='1'>
            <Text variant='headline' weight='bold'>
              {category.name}
            </Text>
          </Box>
          <Button
            color={role || 'client'}
            variant='primary-action'
            text='Settings'
            iconLeft={<Settings />}
            onClick={() =>
              navigate(`/category-settings/${id || category.id}`)
            }
          />
        </Box>
        <Box>
          <Text variant='headline'>Description</Text>
          <Text>{category.description}</Text>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Category;
