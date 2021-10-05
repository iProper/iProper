import { gql } from "@apollo/client";

const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const register = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String
    $isOwner: Boolean!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phoneNumber: $phoneNumber
      isOwner: $isOwner
    )
  }
`;

const registerAddress = gql`
  mutation (
    $num: String!
    $street: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $ownerId: String!
  ) {
    registerAddress(
      num: $num
      street: $street
      city: $city
      province: $province
      postalCode: $postalCode
      ownerId: $ownerId
    )
  }
`;

const currentUser = gql`
  {
    current {
      firstName
      lastName
    }
  }
`;

export { login, register, currentUser };
