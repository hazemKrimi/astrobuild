import { useEffect, useState } from 'react';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Redirect, useHistory, useParams } from 'react-router';
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
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<CategoryOutput>();

  const [getCategories, { loading: categoriesLoading }] = useLazyQuery<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
  >(GET_ALL_CATEGORIES, {
    onCompleted({ getAllCategories }) {
      setCategory(getAllCategories[0]);
    },
    fetchPolicy: 'network-only',
  });

  const [getCategory, { loading: categoryLoading }] = useLazyQuery<
    GetCategoryByIdQuery,
    GetCategoryByIdQueryVariables
  >(GET_CATEGORY_BY_ID, {
    onCompleted({ getCategoryById }) {
      setCategory(getCategoryById);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (id) {
      getCategory({ variables: { id } });
    } else {
      getCategories();
    }

    // eslint-disable-next-line
  }, [id]);

  return role === 'developer' ? (
    <>
      {!categoriesLoading && !categoryLoading ? (
        <>
          {category ? (
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
                    onClick={() => history.push(`/category-settings/${id}`)}
                  />
                </Box>
                <Box>
                  <Text variant='headline'>Description</Text>
                  <Text>{category.description}</Text>
                </Box>
              </Box>
            </Wrapper>
          ) : (
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
          )}
        </>
      ) : (
        <Spinner fullScreen color={role || 'client'} />
      )}
    </>
  ) : (
    <>
      {role === 'admin' && <Redirect to='/clients' />}
      {role === 'client' ||
        (role === 'productOwner' && <Redirect to='/project' />)}
    </>
  );
};

export default Category;
