import gql from 'graphql-tag';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
      description
      image {
        name
        src
      }
    }
  }
`;

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: String!) {
    getCategoryById(id: $id) {
      id
      name
      description
      image {
        name
        src
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($category: CategoryInput!) {
    addCategory(category: $category) {
      id
      name
      description
      image {
        name
        src
      }
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: String!, $category: CategoryInput!) {
    updateCategory(id: $id, category: $category) {
      id
      name
      description
      image {
        name
        src
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
      name
      description
      image {
        name
        src
      }
    }
  }
`;
