import { gql } from "@apollo/client";

const login = gql`
mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const register = gql`
mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!, $phoneNumber: String, $isOwner: Boolean!) {
  register(firstName: $firstName, lastName: $lastName, email: $email, password: $password, phoneNumber: $phoneNumber, isOwner: $isOwner) 
}  
`;

const currentUser = gql`
{
  current {
    firstName
    lastName
  }
}
`

export { login, register, currentUser }