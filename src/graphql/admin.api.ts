import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      firstName
      lastName
      phone {
        prefix
        number
      }
      address {
        place
        city
        country
        zip
      }
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      id
      email
      firstName
      lastName
      phone {
        prefix
        number
      }
      address {
        place
        city
        country
        zip
      }
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: PhoneInputModel!
    $address: AddressInputModel!
    $role: Role!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      address: $address
      role: $role
    ) {
      id
      email
      firstName
      lastName
      phone {
        prefix
        number
      }
      address {
        place
        city
        country
        zip
      }
      role
    }
  }
`;
