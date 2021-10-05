import { gql } from "@apollo/client";

const login = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const requestSms = gql`
  mutation ($phoneNumber: String!) {
    requestSMS(phoneNumber: $phoneNumber)
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

const addProperty = gql`
  mutation (
    $address1: String!
    $address2: String
    $city: String!
    $province: String!
    $postalCode: String!
    $rules: [String]
    $description: String
    $numOfRooms: Int!
  ) {
    addProperty(
      address1: $address1
      address2: $address2
      city: $city
      province: $province
      postalCode: $postalCode
      rules: $rules
      description: $description
      numOfRooms: $numOfRooms
    ) {
      id
    }
  }
`;

const getOwnerProperties = gql`
  {
    getProperties {
      id
      address1
      numOfRooms
      residents {
        id
      }
    }
  }
`;

const getPropertyById = gql`
  query ($id: String!) {
    getProperty(id: $id) {
      id
      address1
      address2
      city
      province
      postalCode
      numOfRooms
      description
      rules
      residents {
        id
      }
    }
  }
`;

const currentUser = gql`
  {
    currentUser {
      id
      firstName
      lastName
      isOwner
      email
      phoneNumber
    }
  }
`;

const updateProperty = gql`
  mutation (
    $id: String!
    $address1: String!
    $address2: String
    $city: String!
    $province: String!
    $postalCode: String!
    $rules: [String]
    $description: String
    $numOfRooms: Int!
  ) {
    updateProperty(
      id: $id
      address1: $address1
      address2: $address2
      city: $city
      province: $province
      postalCode: $postalCode
      rules: $rules
      description: $description
      numOfRooms: $numOfRooms
    ) {
      id
    }
  }
`;

export {
  login,
  register,
  currentUser,
  addProperty,
  getOwnerProperties,
  requestSms,
  getPropertyById,
  updateProperty,
};
