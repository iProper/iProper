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

const checkEmail = gql`
  mutation ($email: String!) {
    checkEmail(email: $email)
  }
`;

const register = gql`
  mutation (
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
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
    $note: String
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
      note: $note
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
      propertyCode
      residents {
        id
        firstName
        lastName
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
      propertyCode
      note
      residentIds
      residents {
        id
        firstName
        lastName
      }
      events {
        id
        name
        description
        toBeCompleted
        isRepeatable
        isCompleted
        assignedTo
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
      propertyCode
    }
  }
`;

const updateProperty = gql`
  mutation (
    $id: String!
    $address1: String
    $address2: String
    $city: String
    $province: String
    $postalCode: String
    $rules: [String]
    $description: String
    $numOfRooms: Int
    $note: String
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
      note: $note
    ) {
      id
    }
  }
`;

const updateUser = gql`
  mutation (
    $firstName: String
    $lastName: String
    $phoneNumber: String
    $propertyCode: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      propertyCode: $propertyCode
      password: $password
    ) {
      id
    }
  }
`;

const addEvent = gql`
  mutation (
    $name: String!
    $description: String!
    $toBeCompleted: Date!
    $isRepeatable: Boolean!
    $propertyId: ID!
    $assignedTo: ID
  ) {
    addEvent(
      name: $name
      description: $description
      toBeCompleted: $toBeCompleted
      isRepeatable: $isRepeatable
      propertyId: $propertyId
      assignedTo: $assignedTo
    ) {
      id
    }
  }
`;

const editEvent = gql`
  mutation (
    $id: ID!
    $name: String
    $description: String
    $toBeCompleted: Date
    $isRepeatable: Boolean
    $propertyId: ID!
    $assignedTo: ID
    $isCompleted: Boolean
    $report: String
  ) {
    updateEvent(
      id: $id
      name: $name
      description: $description
      toBeCompleted: $toBeCompleted
      isRepeatable: $isRepeatable
      propertyId: $propertyId
      assignedTo: $assignedTo
      isCompleted: $isCompleted
      report: $report
    ) {
      id
    }
  }
`;

const processPayment = gql`
  mutation ($propertyId: ID!, $amount: Int!) {
    processPayment(propertyId: $propertyId, amount: $amount)
  }
`;

export {
  login,
  checkEmail,
  register,
  currentUser,
  addProperty,
  getOwnerProperties,
  requestSms,
  getPropertyById,
  updateProperty,
  updateUser,
  addEvent,
  editEvent,
  processPayment,
};
