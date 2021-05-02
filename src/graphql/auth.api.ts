import gql from 'graphql-tag';

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
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
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
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
      token
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetUserPassword(email: $email) {
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

export const CONFIRM_USER_RESET_PASSWORD = gql`
  mutation ConfirmUserResetPassword($id: String!, $password: String!) {
    confirmUserResetPassword(id: $id, password: $password) {
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

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $id: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $phone: PhoneInputModel!
    $address: AddressInputModel!
  ) {
    updateUserInfo(
      id: $id
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      address: $address
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

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($id: String!, $password: PasswordInputModel!) {
    updateUserPassword(id: $id, password: $password) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!, $password: String!) {
    deleteUser(id: $id, password: $password) {
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

export const GET_COUNTRY_CODES = gql`
  query GetCountryCodes {
    getCountryCode {
      prefix
      country
    }
  }
`;
