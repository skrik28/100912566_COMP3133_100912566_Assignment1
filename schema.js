const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    login(username: String!, password: String!): User
    employees: [Employee]!
    employee(id: ID!): Employee
    employeesByFilter(designation: String, department: String): [Employee]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(
      first_name: String!
      last_name: String!
      email: String!
      gender: String!
      designation: String!
      salary: Float!
      date_of_joining: String!
      department: String!
      employee_photo: String
    ): Employee
    updateEmployee(
      id: ID!
      first_name: String
      last_name: String
      email: String
      gender: String
      designation: String
      salary: Float
      department: String
      employee_photo: String
    ): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;

module.exports = typeDefs;