import gql from 'graphql-tag';

export const GET_PROTOTYPE_BY_ID = gql`
  query GetPrototypeById($id: String!) {
    getPrototypeById(id: $id) {
      id
      template
      prototype {
        feature {
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
        connections {
          to
          releations {
            back
            forword
          }
        }
      }
    }
  }
`;

export const ADD_PROTOTYPE = gql`
  mutation AddPrototype($prototype: TemplateProtoTypeInput!) {
    addPrototype(prototype: $prototype) {
      id
      template
      prototype {
        feature {
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
        connections {
          to
          releations {
            back
            forword
          }
        }
      }
    }
  }
`;

export const UPDATE_PROTOTYPE = gql`
  mutation UpdatePrototype($prototype: TemplateProtoTypeInput!) {
    updatePrototype(prototype: $prototype) {
      id
      template
      prototype {
        feature {
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
        connections {
          to
          releations {
            back
            forword
          }
        }
      }
    }
  }
`;
