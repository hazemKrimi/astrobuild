import gql from 'graphql-tag';

export const GET_ALL_FEATURES = gql`
  query GetAllFeatures {
    getAllFeatures {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const GET_FEATURE_BY_ID = gql`
  query GetFeatureById($id: String!) {
    getFeatureById(id: $id) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const ADD_FEATURE = gql`
  mutation AddFeature($feature: FeatureInput!) {
    addFeature(feature: $feature) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const UPDATE_FEATURE = gql`
  mutation UpdateFeature($id: String!, $feature: FeatureInput!) {
    updateFeature(id: $id, feature: $feature) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const DELETE_FEATURE = gql`
  mutation DeleteFeature($id: String!) {
    deleteFeature(id: $id) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const ADD_FEATURE_WIREFRAMES = gql`
  mutation AddFeatureWireframes($id: String!, $wireframes: [InputFile!]!) {
    addFeatureWireframes(id: $id, wireframes: $wireframes) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;

export const DELETE_FEATURE_WIREFRAME = gql`
  mutation DeleteFeatureWireframe($id: String!) {
    deleteFeatureWireframe(id: $id) {
      id
      name
      description
      featureType
      image {
        name
        src
      }
      wireframes {
        id
        name
        src
      }
      price
      repo
    }
  }
`;
